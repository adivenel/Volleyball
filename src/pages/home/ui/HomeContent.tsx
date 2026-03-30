// src/pages/home/ui/HomeContent.tsx (обновленная версия)
import React, { useState } from 'react';
import { HeroSection } from '@/entities/club/ui/HeroSection/HeroSection';
import { MatchesList } from '@/entities/match/ui/MatchesList/MatchesList';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import { SuccessModal } from '@/features/ticket-purchase/ui/SuccessModal';
import { useMatches, usePurchaseTicket } from '@/shared/api/hooks';
import { Match } from '@/shared/api/types';

export const HomeContent: React.FC = () => {
  const { matches: matchesData, loading: matchesLoading, error: matchesError } = useMatches();
  const { purchaseTicket, purchasing } = usePurchaseTicket();
  
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  const openModal = (): void => {
    setIsTicketModalOpen(true);
  };

  const closeModal = (): void => {
    setIsTicketModalOpen(false);
  };

  const closeSuccessModal = (): void => {
    setIsSuccessModalOpen(false);
    setSelectedMatch(null);
    setTicketQuantity(1);
  };

  const handleBuyTickets = async (): Promise<void> => {
    if (!selectedMatch) return;
    
    try {
      await purchaseTicket(selectedMatch.id, ticketQuantity);
      closeModal();
      setIsSuccessModalOpen(true);
    } catch (error) {
      alert('Ошибка при покупке билетов. Пожалуйста, попробуйте позже.');
    }
  };

  const handleMatchChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const matchId = parseInt(event.target.value);
    const match = matchesData.find(m => m.id === matchId);
    if (match) {
      setSelectedMatch(match);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTicketQuantity(parseInt(event.target.value));
  };

  // Форматируем дату для отображения
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Преобразуем API матчи в формат для MatchesList
  const formattedMatches = matchesData.map(match => ({
    id: match.id,
    date: formatDate(match.date),
    opponent: match.opponent,
    location: match.location,
    score: match.score,
  }));

  if (matchesLoading) {
    return <HomeContentSkeleton />;
  }

  if (matchesError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 dark:text-red-400">Ошибка загрузки матчей: {matchesError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-zenit-blue text-white rounded-lg"
        >
          Обновить
        </button>
      </div>
    );
  }

  return (
    <>
      <HeroSection onOpenModal={openModal} />
      <MatchesList matches={formattedMatches} />
      
      <Modal 
        isOpen={isTicketModalOpen} 
        onClose={closeModal}
        title="Купить билеты"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Выберите матч
            </label>
            <select 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={handleMatchChange}
              value={selectedMatch?.id || ''}
            >
              <option value="">-- Выберите матч --</option>
              {matchesData.map(match => (
                <option key={match.id} value={match.id}>
                  {match.opponent} ({formatDate(match.date)}) - {match.location}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Количество билетов
            </label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={ticketQuantity}
              onChange={handleQuantityChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              variant="success" 
              className="flex-1"
              onClick={handleBuyTickets}
              disabled={purchasing || !selectedMatch}
            >
              {purchasing ? 'Оформление...' : 'Купить билеты'}
            </Button>
            <Button 
              variant="close" 
              onClick={closeModal}
            >
              Отмена
            </Button>
          </div>
        </div>
      </Modal>

      {selectedMatch && (
        <SuccessModal 
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          matchInfo={{
            opponent: selectedMatch.opponent,
            date: formatDate(selectedMatch.date)
          }}
          quantity={ticketQuantity}
        />
      )}
    </>
  );
};

// Импортируем скелетон
import { HomeContentSkeleton } from './HomeContentSkeleton';

// В конце файла
export default HomeContent;