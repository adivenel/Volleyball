import React, { useState } from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { TicketForm } from '../TicketForm';
import { Match } from '../../../../entities/match/model/types';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  onSuccess: (matchId: number, quantity: number) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  matches,
  onSuccess
}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [purchasedData, setPurchasedData] = useState<{match: Match; quantity: number} | null>(null);

  const handleTicketPurchase = (data: { matchId: number; quantity: number }) => {
    const match = matches.find(m => m.id === data.matchId);
    if (match) {
      setPurchasedData({ match, quantity: data.quantity });
      setShowSuccess(true);
      onSuccess(data.matchId, data.quantity);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
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
    <Modal isOpen={isOpen} onClose={onClose} title="Покупка билетов">
      <TicketForm 
        matches={matches}
        onTicketPurchase={handleTicketPurchase}
        onClose={onClose}
      />
    </Modal>
  );
};