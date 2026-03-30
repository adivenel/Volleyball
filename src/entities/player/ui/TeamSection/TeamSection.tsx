import React from 'react';
import { PlayerCard } from '../PlayerCard/PlayerCard';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  imageUrl?: string;
  height?: string;
  age?: number;
}

interface TeamSectionProps {
  players: Player[];
  title?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  players, 
  title = "Состав команды" 
}) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zenit-blue dark:text-blue-400 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </section>
  );
};