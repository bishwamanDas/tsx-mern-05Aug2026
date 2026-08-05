'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import LoginForm from '@/components/LoginForm';
import { getCharacters } from '@/services/swapi';
import { Character, Species } from '@/types/swapi';
import CharacterCard from '@/components/CharacterCard';
import CharacterModal from '@/components/CharacterModal';
import Pagination from '@/components/Pagination';
import Loader from '@/components/Loader';
import { Search, AlertTriangle } from 'lucide-react';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCharacterData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharacters(currentPage, debouncedSearch);
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      console.error(err);
      setError('Failed to load archives. The connection to the Jedi Temple was lost.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCharacterData();
    }
  }, [isAuthenticated, fetchCharacterData]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto mb-8 sm:mb-12 relative group">
        <div className="relative flex items-center">
          <Search className="absolute left-3 sm:left-4 text-starwars-yellow" size={18} />
          <input
            type="text"
            placeholder="Search the archive..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-starwars-yellow focus:ring-1 focus:ring-starwars-yellow text-white transition-all text-base sm:text-lg shadow-lg placeholder-gray-500 group-hover:placeholder-starwars-yellow"
          />
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-red-500/10 border border-red-500/20 rounded-2xl max-w-2xl mx-auto">
          <AlertTriangle className="text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-red-200 mb-2">Communication Disruption</h3>
          <p className="text-red-400/80 mb-6">{error}</p>
          <button 
            onClick={fetchCharacterData}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50 rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : loading ? (
        <Loader />
      ) : characters.length === 0 ? (
        <div className="text-center py-12 sm:py-20 text-gray-500">
          <p className="text-base sm:text-xl">No records found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {characters.map((char, index) => (
              <CharacterCard 
                key={char.url} 
                character={char} 
                index={index} 
                onClick={(c, s) => {
                  setSelectedCharacter(c);
                  setSelectedSpecies(s);
                }}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <CharacterModal 
        character={selectedCharacter}
        species={selectedSpecies}
        isOpen={!!selectedCharacter}
        onClose={() => {
          setSelectedCharacter(null);
          setSelectedSpecies(null);
        }}
      />
    </div>
  );
}
