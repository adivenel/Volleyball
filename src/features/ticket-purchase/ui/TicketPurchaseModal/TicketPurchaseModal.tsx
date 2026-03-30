import React, { useState } from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { Match } from '../../../../entities/match/model/types';

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  onSuccess: (matchId: number, quantity: number) => void;
}

export const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({
  isOpen,
  onClose,
  matches,
  onSuccess
}) => {
  const [selectedMatch, setSelectedMatch] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [purchasedData, setPurchasedData] = useState<{match: Match; quantity: number} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMatch > 0) {
      const match = matches.find(m => m.id === selectedMatch);
      if (match) {
        setPurchasedData({ match, quantity });
        setShowSuccess(true);
        onSuccess(selectedMatch, quantity);
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSelectedMatch(0);
    setQuantity(1);
    setPurchasedData(null);
    onClose();
  };

  if (showSuccess && purchasedData) {
    return (
      <Modal isOpen={isOpen} onClose={handleSuccessClose} title="Успешное оформление">
        <div className="text-center py-4">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
            Билеты успешно оформлены!
          </h3>
          <div className="space-y-2 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Билеты на матч <strong>«{purchasedData.match.opponent} — {purchasedData.match.date}»</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Количество: <strong>{purchasedData.quantity} шт.</strong>
            </p>
          </div>
          <p className="text-zenit-blue dark:text-blue-400 font-bold text-lg mb-6">
            Спасибо за поддержку Зенита!
          </p>

          <div className="flex gap-3 justify-center">
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              onClick={handleSuccessClose}
            >
              OK
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              onClick={handleSuccessClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Купить билет на матч">
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
          <button 
            type="button" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  );
};