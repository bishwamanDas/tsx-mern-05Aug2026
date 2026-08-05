'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token, username: returnedUsername } = response.data;
      login(token, returnedUsername);
    } catch (err) {
      setError('Invalid username or password (hint: use admin/admin)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,232,31,0.2)]">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wider text-starwars-yellow uppercase">
          Jedi Archives
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-1 group-hover:text-starwars-yellow group-focus-within:text-starwars-yellow transition-colors">Jedi ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-starwars-yellow focus:ring-1 focus:ring-starwars-yellow text-white transition-colors"
              placeholder="Enter Jedi ID"
              required
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-1 group-hover:text-starwars-yellow group-focus-within:text-starwars-yellow transition-colors">Access Code</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-starwars-yellow focus:ring-1 focus:ring-starwars-yellow text-white transition-colors"
              placeholder="Enter access code"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-starwars-yellow hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            {isLoading ? 'Authenticating...' : 'Access Archives'}
          </button>
        </form>
      </div>
    </div>
  );
}
