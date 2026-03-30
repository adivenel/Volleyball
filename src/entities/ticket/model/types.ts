export interface TicketPurchaseData {
  matchId: number;
  quantity: number;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchInfo: {
    opponent: string;
    date: string;
  };
  quantity: number;
}