// src/shared/api/hooks.ts
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from './client';
import { Match, News, Achievement, Player, Ticket } from './types';

// Существующие хуки
export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<Match[]>('/matches');
      setMatches(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refetch: fetchMatches };
}

export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<News[]>('/news');
      setNews(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, loading, error, refetch: fetchNews };
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<Achievement[]>('/achievements');
      setAchievements(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, loading, error, refetch: fetchAchievements };
}

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<Player[]>('/players');
      setPlayers(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch players');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return { players, loading, error, refetch: fetchPlayers };
}

export function usePurchaseTicket() {
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseTicket = useCallback(async (matchId: number, quantity: number) => {
    try {
      setPurchasing(true);
      setError(null);
      
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Для покупки билетов необходимо авторизоваться');
      }
      
      const ticket = await apiClient.post<Ticket>('/tickets/purchase', {
        match_id: matchId,
        quantity,
      });
      return ticket;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to purchase ticket';
      setError(message);
      throw err;
    } finally {
      setPurchasing(false);
    }
  }, []);

  return { purchaseTicket, purchasing, error };
}

// НОВЫЙ ХУК: Управление новостями (админ)
export function useAdminNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNews = useCallback(async (newsData: Omit<News, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const news = await apiClient.post<News>('/admin/news', newsData);
      return news;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create news';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNews = useCallback(async (id: number, newsData: Partial<News>) => {
    try {
      setLoading(true);
      setError(null);
      const news = await apiClient.put<News>(`/admin/news/${id}`, newsData);
      return news;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update news';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNews = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/admin/news/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete news';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createNews, updateNews, deleteNews, loading, error };
}

// НОВЫЙ ХУК: Управление матчами (админ)
export function useAdminMatches() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMatch = useCallback(async (matchData: Omit<Match, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const match = await apiClient.post<Match>('/admin/matches', matchData);
      return match;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create match';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMatch = useCallback(async (id: number, matchData: Partial<Match>) => {
    try {
      setLoading(true);
      setError(null);
      const match = await apiClient.put<Match>(`/admin/matches/${id}`, matchData);
      return match;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update match';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMatch = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/admin/matches/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete match';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createMatch, updateMatch, deleteMatch, loading, error };
}