import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  login: (token: string, username: string) => {
    Cookies.set('token', token, { expires: 1 / 24 }); // Expires in 1 hour
    Cookies.set('username', username, { expires: 1 / 24 });
    set({ isAuthenticated: true, username });
  },
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('username');
    set({ isAuthenticated: false, username: null });
  },
  checkAuth: () => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    if (token && username) {
      set({ isAuthenticated: true, username });
    } else {
      set({ isAuthenticated: false, username: null });
    }
  },
}));
