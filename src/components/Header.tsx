'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { LogOut, Star, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { isAuthenticated, username, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center text-sm sm:text-xl font-bold tracking-widest text-starwars-yellow uppercase shrink-0">
          <Star size={20} strokeWidth={2.5} className="sm:hidden" />
          <Star size={28} strokeWidth={2.5} className="hidden sm:block" />
          tar <span className="font-extrabold mx-0.5">-</span> Wars{' '}
          <span style={{ display: 'inline-block', transform: 'scaleY(1.5)', marginRight: '-4px' }}>
            <X size={20} strokeWidth={2.5} className="sm:hidden" />
            <X size={28} strokeWidth={2.5} className="hidden sm:block" />
          </span>plorer
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <span className="group text-xs sm:text-sm flex gap-1 cursor-default transition-colors min-w-0">
              <span className="text-starwars-yellow group-hover:text-white transition-colors hidden sm:inline shrink-0">
                Active User:
              </span>
              <span className="text-white group-hover:text-starwars-yellow transition-colors truncate max-w-[100px] sm:max-w-none">
                {username}
              </span>
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md bg-white/5 hover:bg-white/10 text-white hover:text-starwars-yellow transition-colors shrink-0"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
