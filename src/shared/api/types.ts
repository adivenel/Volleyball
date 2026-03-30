// src/shared/api/types.ts
export interface Match {
  id: number;
  opponent: string;
  date: string;
  location: string;
  score?: string;
  status: string;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image_url?: string;
  created_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  value: string;
  description: string;
  created_at: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  height?: string;
  age?: number;
  image_url?: string;
}

export interface TicketPurchaseRequest {
  match_id: number;
  quantity: number;
}

export interface Ticket {
  id: number;
  match_id: number;
  user_id: number;
  quantity: number;
  status: string;
  purchased_at: string;
  match?: Match;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}