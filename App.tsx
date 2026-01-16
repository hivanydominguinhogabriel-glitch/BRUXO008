
import React, { useState } from 'react';
import { AppScreen } from './types';
import Navigation from './components/Navigation';
import Discovery from './components/Discovery';
import Matches from './components/Matches';
import DateSpots from './components/DateSpots';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DISCOVERY);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.DISCOVERY:
        return <Discovery />;
      case AppScreen.MATCHES:
        return <Matches />;
      case AppScreen.DATE_SPOTS:
        return <DateSpots />;
      case AppScreen.PROFILE:
        return (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-xl">
              👤
            </div>
            <h2 className="text-2xl font-bold">Meu Perfil</h2>
            <p className="text-gray-500 mt-2">Personalize como os outros te vêem em Tete.</p>
            <button className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold w-full max-w-xs">
              Editar Perfil
            </button>
            <button className="mt-4 text-gray-400 font-semibold">Configurações</button>
          </div>
        );
      default:
        return <Discovery />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-200">
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 transition-all duration-300">
          {renderScreen()}
        </div>
      </main>
      
      <Navigation currentScreen={currentScreen} setScreen={setCurrentScreen} />
    </div>
  );
};

export default App;
