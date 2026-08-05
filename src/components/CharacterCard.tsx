'use client';

import { useEffect, useState } from 'react';
import { Character, Species } from '@/types/swapi';
import { useSwapiStore } from '@/store/useSwapiStore';
import { motion } from 'framer-motion';

interface CharacterCardProps {
  character: Character;
  index: number;
  onClick: (character: Character, species: Species | null) => void;
}

import { getSpeciesTheme } from '@/utils/colors';

export default function CharacterCard({ character, index, onClick }: CharacterCardProps) {
  const fetchSpecies = useSwapiStore((state) => state.fetchSpecies);
  const [species, setSpecies] = useState<Species | null>(null);
  
  useEffect(() => {
    if (character.species.length > 0) {
      fetchSpecies(character.species[0]).then(setSpecies);
    } else {
      setSpecies({ name: 'Human' } as Species); // Default
    }
  }, [character.species, fetchSpecies]);

  const theme = getSpeciesTheme(species?.name);
  const seed = character.name.replace(/[^a-zA-Z]/g, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: `0 0 30px 5px ${theme.glow}`,
        transition: { duration: 0.12, ease: 'easeOut' }
      }}
      onClick={() => onClick(character, species)}
      style={{ willChange: 'transform' }}
      className={`cursor-pointer rounded-xl overflow-hidden border bg-gradient-to-br ${theme.bg} backdrop-blur-sm`}
    >
      <div className="h-36 sm:h-48 overflow-hidden relative">
        <img 
          src={`https://picsum.photos/seed/${seed}/400/300`} 
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-sm sm:text-xl font-bold text-white truncate">{character.name}</h3>
          <p className="text-xs sm:text-sm text-gray-300">{species ? species.name : 'Loading...'}</p>
        </div>
      </div>
    </motion.div>
  );
}
