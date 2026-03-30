import React from 'react';
import { Match } from '../../model/types';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:shadow-custom-dark">
      <h3 className="text-xl font-bold text-zenit-blue dark:text-blue-400 mb-2">
        {match.opponent}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 italic mb-3">{match.date}</p>
      <p className="text-gray-800 dark:text-gray-200 font-medium">
        📍 {match.location}
      </p>
    </div>
  );
};