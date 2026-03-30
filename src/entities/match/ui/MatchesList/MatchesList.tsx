import React from 'react';
import { MatchCard } from '../MatchCard';
import { Match } from '../../model/types';

interface MatchesListProps {
  matches: Match[];
  title?: string;
}

export const MatchesList: React.FC<MatchesListProps> = ({ 
  matches, 
  title = "Ближайшие матчи" 
}) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zenit-blue dark:text-blue-400 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
};