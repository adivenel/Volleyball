import React from 'react';
import { Player } from '../../model/types';
import { playerPhotos } from '@/pages/team/ui/player-photos';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center">
      {playerPhotos[player.id] ? (
        <img 
          src={playerPhotos[player.id]} 
          alt={player.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-zenit-blue"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-zenit-blue flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
          {player.number}
        </div>
      )}
      
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        {player.name}
      </h3>
      <p className="text-zenit-blue dark:text-blue-400 mb-3">
        №{player.number} • {player.position}
      </p>
      
      {(player.height || player.age) && (
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {player.height && `Рост: ${player.height}`}
          {player.height && player.age && ' • '}
          {player.age && `Возраст: ${player.age}`}
        </p>
      )}
    </div>
  );
};