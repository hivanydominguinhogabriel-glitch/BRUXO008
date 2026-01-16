
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { generateIcebreaker } from '../services/geminiService';

const MOCK_PROFILES: UserProfile[] = [
  {
    id: '1',
    name: 'Elena',
    age: 24,
    bio: 'Adoro caminhar perto do Zambeze ao entardecer. Procuro alguém para dividir uma boa refeição.',
    neighborhood: 'Chingodzi',
    interests: ['Dança', 'Culinária', 'Viagens'],
    photos: ['https://picsum.photos/seed/elena/400/600']
  },
  {
    id: '2',
    name: 'Ricardo',
    age: 28,
    bio: 'Engenheiro, fã de futebol e churrasco de domingo. Tete é quente, mas meu coração é mais!',
    neighborhood: 'Francisco Manyanga',
    interests: ['Futebol', 'Música', 'Grelhados'],
    photos: ['https://picsum.photos/seed/ricardo/400/600']
  },
  {
    id: '3',
    name: 'Sofia',
    age: 22,
    bio: 'Estudante de medicina. Gosto de ler e de noites tranquilas com boa conversa.',
    neighborhood: 'Degue',
    interests: ['Leitura', 'Cinema', 'Café'],
    photos: ['https://picsum.photos/seed/sofia/400/600']
  }
];

const Discovery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [icebreaker, setIcebreaker] = useState<string | null>(null);
  const [loadingIcebreaker, setLoadingIcebreaker] = useState(false);

  const currentProfile = MOCK_PROFILES[currentIndex];

  const handleNext = () => {
    setIcebreaker(null);
    setCurrentIndex((prev) => (prev + 1) % MOCK_PROFILES.length);
  };

  const handleIcebreaker = async () => {
    setLoadingIcebreaker(true);
    const msg = await generateIcebreaker(currentProfile);
    setIcebreaker(msg);
    setLoadingIcebreaker(false);
  };

  if (!currentProfile) return null;

  return (
    <div className="flex flex-col h-full p-4 pb-20 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-orange-600">TeteEncontros</h1>
        <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
          Tete, MZ
        </div>
      </div>

      <div className="relative flex-1 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <img 
          src={currentProfile.photos[0]} 
          alt={currentProfile.name}
          className="w-full h-2/3 object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white h-1/2 flex flex-col justify-end">
          <div className="flex items-end gap-2 mb-1">
            <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
          </div>
          <p className="text-sm opacity-90 mb-2 flex items-center">
            <span className="mr-1">📍</span> {currentProfile.neighborhood}
          </p>
          <p className="text-sm line-clamp-2 mb-4 italic opacity-80">"{currentProfile.bio}"</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProfile.interests.map(interest => (
              <span key={interest} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                {interest}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleNext}
              className="flex-1 bg-gray-200/20 backdrop-blur-md hover:bg-gray-200/30 text-white py-3 rounded-2xl font-semibold transition-all active:scale-95"
            >
              Próximo
            </button>
            <button 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg shadow-orange-500/30 transition-all active:scale-95"
            >
              Match
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={handleIcebreaker}
          disabled={loadingIcebreaker}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
        >
          {loadingIcebreaker ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <span>✨ Wingman AI: Gerar Abridor</span>
          )}
        </button>
        
        {icebreaker && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm text-indigo-900 leading-relaxed">
              <span className="font-bold block mb-1">Sugestão do Wingman:</span>
              "{icebreaker}"
            </p>
            <button className="mt-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">Copiar Mensagem</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;
