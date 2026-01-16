
import React from 'react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen }) => {
  const tabs = [
    { id: AppScreen.DISCOVERY, icon: "🔥", label: "Descobrir" },
    { id: AppScreen.DATE_SPOTS, icon: "📍", label: "Locais" },
    { id: AppScreen.MATCHES, icon: "💬", label: "Matches" },
    { id: AppScreen.PROFILE, icon: "👤", label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 safe-area-bottom z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            currentScreen === tab.id ? 'text-orange-500' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px] font-medium mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
