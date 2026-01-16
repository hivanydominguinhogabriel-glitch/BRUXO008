
import React, { useEffect, useState } from 'react';
import { getTeteDateSpots } from '../services/geminiService';

const DateSpots: React.FC = () => {
  const [data, setData] = useState<{ text: string; links: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getTeteDateSpots();
      if (res) setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-2">Onde Ir em Tete?</h2>
      <p className="text-gray-500 mb-6">Planeie o encontro perfeito com ajuda da nossa IA.</p>

      {loading ? (
        <div className="space-y-4">
          <div className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
          <div className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
          <div className="h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data?.text || "Não conseguimos carregar recomendações no momento."}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h3 className="font-bold text-lg px-2">Links Úteis</h3>
            {data?.links.map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.maps?.uri || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-orange-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{link.maps?.title || 'Local no Mapa'}</p>
                    <p className="text-xs text-gray-400">Ver no Google Maps</p>
                  </div>
                </div>
                <span className="text-gray-300">→</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSpots;
