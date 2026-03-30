// src/shared/api/hooks.ts
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from './client';
import { Match, News, Achievement, Player, Ticket } from './types';

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
      const ticket = await apiClient.post<Ticket>('/tickets/purchase', {
        match_id: matchId,
        quantity,
      });
      return ticket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase ticket');
      throw err;
    } finally {
      setPurchasing(false);
    }
  }, []);

  return { purchaseTicket, purchasing, error };
}