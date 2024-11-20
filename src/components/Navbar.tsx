import React from 'react';
import { Home, Blocks, Wallet, Activity, Settings, BarChart2, Code, Shield, Trophy, XIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import logoDark from '../assets/logo.svg';
import DarkModeToggle from './DarkModeToggle';
import { useDarkMode } from '../context/DarkModeContext';

function Navbar({setOpen, open}: {setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void, open: boolean}) {
  const location = useLocation();
  const { isDark } = useDarkMode();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Blocks, label: 'Blocks', path: '/blocks' },
    { icon: BarChart2, label: 'Challenges', path: '/challenges' },
    { icon: Code, label: 'Algorithms', path: '/algorithms' },
    { icon: Activity, label: 'Benchmarks', path: '/benchmarks' },
    { icon: Shield, label: 'Proofs', path: '/proofs' },
    { icon: Settings, label: 'Config', path: '/config' },
    { icon: Wallet, label: 'Accounts', path: '/accounts' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <nav className={`fixed ${open ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 left-0 top-0 h-screen w-64 bg-background-white dark:bg-background-dark border-r border-black dark:border-ui-dark-border p-4 z-[100] transition-all ease-linear duration-[.2s] overflow-y-auto`}>
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <XIcon className={`size-8 cursor-pointer ml-auto ${open ? "block" : "hidden"}`} onClick={() => setOpen((prevState: boolean) => !prevState)}/>
        <Link to="/" className="flex flex-col items-center">
          <img 
            src={isDark ? logoDark : logo}
            alt="Logo" 
            className="h-36 w-auto"
          />
          <span className="text-xs text-text-light dark:text-text-dark-secondary mt-2">
            Powered by Zaibatsu
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-6 pb-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-enhanced
                ${location.pathname === item.path
                  ? 'bg-brand-primary-DEFAULT/10 text-brand-primary-DEFAULT dark:text-brand-primary-dark'
                  : 'text-text-light hover:bg-brand-primary-DEFAULT/10 hover:text-brand-primary-DEFAULT dark:text-text-dark-secondary dark:hover:text-brand-primary-dark'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className='text-sm'>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
