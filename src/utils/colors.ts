export const getSpeciesTheme = (speciesName?: string) => {
  const name = (speciesName || 'unknown').toLowerCase();
  
  if (name.includes('droid')) {
    return {
      bg: 'from-gray-500/20 to-gray-800/40 border-gray-400',
      glow: 'rgba(156, 163, 175, 0.8)',
      text: 'text-gray-400'
    };
  }
  if (name.includes('wookie')) {
    return {
      bg: 'from-amber-700/30 to-amber-900/60 border-amber-700',
      glow: 'rgba(180, 83, 9, 0.8)',
      text: 'text-amber-500'
    };
  }
  if (name.includes('hutt')) {
    return {
      bg: 'from-green-500/20 to-green-900/40 border-green-500',
      glow: 'rgba(34, 197, 94, 0.8)',
      text: 'text-green-500'
    };
  }
  if (name.includes('human')) {
    return {
      bg: 'from-sky-500/20 to-sky-900/40 border-sky-500',
      glow: 'rgba(14, 165, 233, 0.8)',
      text: 'text-sky-400'
    };
  }
  
  // Unknown / Default (Purple)
  return {
    bg: 'from-purple-500/20 to-purple-900/40 border-purple-500',
    glow: 'rgba(168, 85, 247, 0.8)',
    text: 'text-purple-400'
  };
};
