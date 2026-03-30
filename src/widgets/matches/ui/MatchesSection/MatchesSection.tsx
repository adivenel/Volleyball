import React from 'react';
import { MatchesList } from '../../../../entities/match/ui/MatchesList';
import { Match } from '../../../../entities/match/model/types';

interface MatchesSectionProps {
  matches: Match[];
  title?: string;
}

export const MatchesSection: React.FC<MatchesSectionProps> = ({ 
  matches, 
  title = "Ближайшие матчи" 
}) => {
  return <MatchesList matches={matches} title={title} />;
};