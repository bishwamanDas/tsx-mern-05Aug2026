'use client';

import { useEffect, useState } from 'react';
import { Character, Species, Homeworld } from '@/types/swapi';
import { useSwapiStore } from '@/store/useSwapiStore';
import { format, parseISO } from 'date-fns';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSpeciesTheme } from '@/utils/colors';

interface CharacterModalProps {
  character: Character | null;
  species: Species | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({ character, species, isOpen, onClose }: CharacterModalProps) {
  const fetchHomeworld = useSwapiStore((state) => state.fetchHomeworld);
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && character?.homeworld) {
      setLoading(true);
      fetchHomeworld(character.homeworld).then((data) => {
        setHomeworld(data);
        setLoading(false);
      });
    }
  }, [isOpen, character, fetchHomeworld]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!character) return null;

  const formattedDate = character.created 
    ? format(parseISO(character.created), 'dd-MM-yyyy')
    : 'Unknown';

  const heightInMeters = character.height !== 'unknown' 
    ? (parseInt(character.height) / 100).toFixed(2) + ' m'
    : 'Unknown';

  const mass = character.mass !== 'unknown'
    ? character.mass + ' kg'
    : 'Unknown';

  const theme = getSpeciesTheme(species?.name);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity', boxShadow: `0 0 40px ${theme.glow}` }}
            className={`relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] border border-white/20 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col sm:flex-row bg-gradient-to-br ${theme.bg}`}
          >
            <div className="w-full sm:w-2/5 h-44 sm:h-auto relative bg-black shrink-0">
              <img
                src={`https://picsum.photos/seed/${character.name.replace(/[^a-zA-Z]/g, '')}/400/600`}
                alt={character.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:bg-gradient-to-r" />
            </div>

            <div className="w-full sm:w-3/5 p-4 sm:p-6 md:p-8 relative overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-starwars-yellow bg-black/50 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl sm:text-3xl font-bold text-starwars-yellow tracking-wider uppercase mb-1 pr-8">
                {character.name}
              </h2>
              <p className={`text-xs sm:text-sm mb-4 sm:mb-6 font-mono border-b border-white/10 pb-3 sm:pb-4 ${theme.text}`}>
                {species?.name || 'Human'}
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6">
                <div>
                  <span className="block text-gray-500 mb-1">Height</span>
                  <span className="text-white font-medium">{heightInMeters}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Mass</span>
                  <span className="text-white font-medium">{mass}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Birth Year</span>
                  <span className="text-white font-medium">{character.birth_year}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Films</span>
                  <span className="text-white font-medium">{character.films.length}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-gray-500 mb-1">Date Added</span>
                  <span className="text-white font-medium">{formattedDate}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Homeworld Details</h3>
                
                {loading ? (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-4 h-4 border-2 border-starwars-yellow border-t-transparent rounded-full animate-spin"></div>
                    <span>Decrypting archives...</span>
                  </div>
                ) : homeworld ? (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500 block text-xs">Name</span>
                      <span className="text-white">{homeworld.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Residents</span>
                      <span className="text-white">{homeworld.residents.length}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block text-xs">Terrain</span>
                      <span className="text-white block">{homeworld.terrain}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block text-xs">Climate</span>
                      <span className="text-white block">{homeworld.climate}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-red-400 text-sm">Failed to retrieve homeworld data</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
