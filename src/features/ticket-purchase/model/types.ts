export interface TicketPurchaseData {
  matchId: number;
  quantity: number;
}

export interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: any[];
  onSuccess: (matchId: number, quantity: number) => void;
}