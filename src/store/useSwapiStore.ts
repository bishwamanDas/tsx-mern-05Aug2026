import { create } from 'zustand';
import { Species, Homeworld } from '@/types/swapi';
import { getSpeciesByUrl, getHomeworldByUrl } from '@/services/swapi';

interface SwapiState {
  speciesCache: Record<string, Species>;
  homeworldCache: Record<string, Homeworld>;
  fetchSpecies: (url: string) => Promise<Species | null>;
  fetchHomeworld: (url: string) => Promise<Homeworld | null>;
}

export const useSwapiStore = create<SwapiState>((set, get) => ({
  speciesCache: {},
  homeworldCache: {},
  fetchSpecies: async (url: string) => {
    if (!url) return null;
    const { speciesCache } = get();
    if (speciesCache[url]) return speciesCache[url];

    try {
      const species = await getSpeciesByUrl(url);
      set((state) => ({ speciesCache: { ...state.speciesCache, [url]: species } }));
      return species;
    } catch (error) {
      console.error('Failed to fetch species:', error);
      return null;
    }
  },
  fetchHomeworld: async (url: string) => {
    if (!url) return null;
    const { homeworldCache } = get();
    if (homeworldCache[url]) return homeworldCache[url];

    try {
      const homeworld = await getHomeworldByUrl(url);
      set((state) => ({ homeworldCache: { ...state.homeworldCache, [url]: homeworld } }));
      return homeworld;
    } catch (error) {
      console.error('Failed to fetch homeworld:', error);
      return null;
    }
  },
}));
