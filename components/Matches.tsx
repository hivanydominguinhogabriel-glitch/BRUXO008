
import React from 'react';
import { Match } from '../types';

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    user: {
      id: 'm1',
      name: 'Carla',
      age: 23,
      bio: 'Loves music',
      neighborhood: 'Cidade',
      interests: [],
      photos: ['https://picsum.photos/seed/carla/100']
    },
    lastMessage: 'Amanhã no Zambeze?',
    unreadCount: 1
  },
  {
    id: '2',
    user: {
      id: 'm2',
      name: 'Mateus',
      age: 26,
      bio: 'Traveler',
      neighborhood: 'Moatize',
      interests: [],
      photos: ['https://picsum.photos/seed/mateus/100']
    },
    lastMessage: 'Oi, tudo bem?',
    unreadCount: 0
  }
];

const Matches: React.FC = () => {
  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Suas Conversas</h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex flex-col items-center gap-1 min-w-[70px]">
          <div className="w-16 h-16 rounded-full border-2 border-orange-500 p-0.5">
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              ➕
            </div>
          </div>
          <span className="text-[10px] font-medium text-gray-500">Novo</span>
        </div>
        {MOCK_MATCHES.map(match => (
          <div key={match.id} className="flex flex-col items-center gap-1 min-w-[70px]">
             <div className="w-16 h-16 rounded-full border-2 border-orange-500 p-0.5">
                <img src={match.user.photos[0]} className="w-full h-full rounded-full object-cover" alt="" />
             </div>
             <span className="text-[10px] font-medium text-gray-900">{match.user.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {MOCK_MATCHES.map(match => (
          <div key={match.id} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-2xl transition-colors">
            <img src={match.user.photos[0]} className="w-16 h-16 rounded-full object-cover" alt="" />
            <div className="flex-1 border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{match.user.name}</h3>
                <span className="text-[10px] text-gray-400">14:20</span>
              </div>
              <p className={`text-sm ${match.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'} truncate`}>
                {match.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
