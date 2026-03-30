import React from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button'; 

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchInfo: {
    opponent: string;
    date: string;
  };
  quantity: number;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  matchInfo, 
  quantity 
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Успешное оформление"
    >
      <div className="text-center py-4">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
          Билеты успешно оформлены!
        </h3>
        <div className="space-y-2 mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            Билеты на матч <strong>«{matchInfo.opponent} — {matchInfo.date}»</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Количество: <strong>{quantity} шт.</strong>
          </p>
        </div>
        <p className="text-zenit-blue dark:text-blue-400 font-bold text-lg mb-6">
          Спасибо за поддержку Зенита!
        </p>

        <div className="flex gap-3 justify-center">
          <Button 
            variant="success" 
            onClick={onClose}
          >
            OK
          </Button>
          <Button 
            variant="close" 
            onClick={onClose}
          >
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
};