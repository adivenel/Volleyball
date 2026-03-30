// src/pages/team/ui/TeamContent.tsx
import React from 'react';
import { TeamSection } from '@/entities/player/ui/TeamSection/TeamSection';
import { usePlayers } from '@/shared/api/hooks';
import { playerPhotos } from './player-photos';

export const TeamContent: React.FC = () => {
  const { players, loading, error } = usePlayers();

  if (loading) {
    return <TeamContentSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 dark:text-red-400">Ошибка загрузки состава команды: {error}</p>
      </div>
    );
  }

  // Преобразуем API игроков в формат, ожидаемый TeamSection
  const formattedPlayers = players.map(player => ({
    id: player.id,
    name: player.name,
    position: player.position,
    number: player.number,
    height: player.height,
    age: player.age,
    imageUrl: playerPhotos[player.id], // используем локальные фото
  }));

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-5">
        <TeamSection players={formattedPlayers} />
      </div>
    </div>
  );
};

import { TeamContentSkeleton } from './TeamContentSkeleton';

export default TeamContent;