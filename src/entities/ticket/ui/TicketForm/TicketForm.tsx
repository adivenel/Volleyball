import React, { useState } from 'react';
import { Match } from '../../../../entities/match/model/types';
import { TicketPurchaseData } from '../../model/types';

interface TicketFormProps {
  matches: Match[];
  onTicketPurchase: (data: TicketPurchaseData) => void;
  onClose?: () => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ 
  matches, 
  onTicketPurchase, 
  onClose 
}) => {
  const [selectedMatch, setSelectedMatch] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMatch > 0) {
      onTicketPurchase({ matchId: selectedMatch, quantity });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="match-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <strong>Выберите матч:</strong>
          </label>
          <select 
            id="match-select"
            value={selectedMatch}
            onChange={(e) => setSelectedMatch(Number(e.target.value))}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-zenit-blue focus:border-transparent transition-colors"
          >
            <option value={0}>-- Выберите матч --</option>
            {matches.map(match => (
              <option key={match.id} value={match.id}>
                {match.opponent} ({match.date})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ticket-count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Количество билетов:
          </label>
          <input 
            type="number" 
            id="ticket-count" 
            min="1" 
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-zenit-blue focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-zenit-blue hover:bg-zenit-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedMatch === 0}
          >
            Оформить заказ
          </button>
          {onClose && (
            <button 
              type="button" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              onClick={onClose}
            >
              Закрыть
            </button>
          )}
        </div>
      </form>
    </div>
  );
};