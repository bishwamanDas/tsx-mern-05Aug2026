import { swapiClient } from '@/lib/axios';
import { Character, Species, Homeworld } from '@/types/swapi';
import axios from 'axios';

const PAGE_SIZE = 10;

let cache: Character[] | null = null;

export const getCharacters = async (page: number = 1, query?: string) => {
  if (!cache) {
    const res = await swapiClient.get<Character[]>('/people');
    cache = res.data;
  }

  let results = cache;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter((c) => c.name.toLowerCase().includes(q));
  }

  const count = results.length;
  const start = (page - 1) * PAGE_SIZE;
  const paged = results.slice(start, start + PAGE_SIZE);

  return {
    count,
    results: paged,
    next: start + PAGE_SIZE < count ? String(page + 1) : null,
    previous: page > 1 ? String(page - 1) : null,
  };
};

export const getSpeciesByUrl = async (url: string) => {
  const res = await axios.get<Species>(url);
  return res.data;
};

export const getHomeworldByUrl = async (url: string) => {
  const res = await axios.get<Homeworld>(url);
  return res.data;
};
