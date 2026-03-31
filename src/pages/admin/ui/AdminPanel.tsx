// src/pages/admin/ui/AdminPanel.tsx
import React, { useState } from 'react';
import { useNews, useMatches, useAdminNews, useAdminMatches } from '@/shared/api/hooks';
import { News, Match } from '@/shared/api/types';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'matches'>('news');
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [newsForm, setNewsForm] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    date: new Date().toISOString().slice(0, 10) 
  });
  const [matchForm, setMatchForm] = useState({ 
    opponent: '', 
    date: '', 
    location: '', 
    status: 'upcoming' 
  });

  const { news, refetch: refetchNews } = useNews();
  const { matches, refetch: refetchMatches } = useMatches();
  const { createNews, updateNews, deleteNews, loading: newsLoading } = useAdminNews();
  const { createMatch, updateMatch, deleteMatch, loading: matchLoading } = useAdminMatches();

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await updateNews(editingNews.id, newsForm);
      } else {
        await createNews({ 
          ...newsForm, 
          date: new Date(newsForm.date).toISOString() 
        });
      }
      resetNewsForm();
      refetchNews();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Ошибка при сохранении новости');
    }
  };

  const handleMatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMatch) {
        await updateMatch(editingMatch.id, matchForm);
      } else {
        await createMatch({ 
          ...matchForm, 
          date: new Date(matchForm.date).toISOString() 
        });
      }
      resetMatchForm();
      refetchMatches();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Ошибка при сохранении матча');
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm('Удалить новость?')) {
      try {
        await deleteNews(id);
        refetchNews();
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : 'Ошибка при удалении новости');
      }
    }
  };

  const handleDeleteMatch = async (id: number) => {
    if (confirm('Удалить матч?')) {
      try {
        await deleteMatch(id);
        refetchMatches();
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : 'Ошибка при удалении матча');
      }
    }
  };

  const resetNewsForm = () => {
    setEditingNews(null);
    setNewsForm({ title: '', excerpt: '', content: '', date: new Date().toISOString().slice(0, 10) });
  };

  const resetMatchForm = () => {
    setEditingMatch(null);
    setMatchForm({ opponent: '', date: '', location: '', status: 'upcoming' });
  };

  const editNews = (item: News) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: new Date(item.date).toISOString().slice(0, 10),
    });
  };

  const editMatch = (item: Match) => {
    setEditingMatch(item);
    setMatchForm({
      opponent: item.opponent,
      date: new Date(item.date).toISOString().slice(0, 16),
      location: item.location,
      status: item.status,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold text-zenit-blue dark:text-blue-400 mb-8">
        Панель администратора
      </h1>
      
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('news')}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'news' 
              ? 'border-b-2 border-zenit-blue text-zenit-blue dark:text-blue-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Управление новостями
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'matches' 
              ? 'border-b-2 border-zenit-blue text-zenit-blue dark:text-blue-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Управление матчами
        </button>
      </div>

      {/* Форма для новостей */}
      {activeTab === 'news' && (
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            {editingNews ? 'Редактировать новость' : 'Добавить новость'}
          </h2>
          <form onSubmit={handleNewsSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Заголовок"
              value={newsForm.title}
              onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <input
              type="text"
              placeholder="Краткое описание"
              value={newsForm.excerpt}
              onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <textarea
              placeholder="Полный текст"
              value={newsForm.content}
              onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              rows={4}
              required
            />
            <input
              type="date"
              value={newsForm.date}
              onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={newsLoading}
                className="px-4 py-2 bg-zenit-blue text-white rounded-lg hover:bg-zenit-dark transition-colors disabled:opacity-50"
              >
                {newsLoading ? 'Сохранение...' : (editingNews ? 'Обновить' : 'Добавить')}
              </button>
              {editingNews && (
                <button
                  type="button"
                  onClick={resetNewsForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Форма для матчей */}
      {activeTab === 'matches' && (
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            {editingMatch ? 'Редактировать матч' : 'Добавить матч'}
          </h2>
          <form onSubmit={handleMatchSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Соперник"
              value={matchForm.opponent}
              onChange={(e) => setMatchForm({...matchForm, opponent: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <input
              type="datetime-local"
              value={matchForm.date}
              onChange={(e) => setMatchForm({...matchForm, date: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <input
              type="text"
              placeholder="Место проведения"
              value={matchForm.location}
              onChange={(e) => setMatchForm({...matchForm, location: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              required
            />
            <select
              value={matchForm.status}
              onChange={(e) => setMatchForm({...matchForm, status: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="upcoming">Предстоящий</option>
              <option value="live">В эфире</option>
              <option value="finished">Завершен</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={matchLoading}
                className="px-4 py-2 bg-zenit-blue text-white rounded-lg hover:bg-zenit-dark transition-colors disabled:opacity-50"
              >
                {matchLoading ? 'Сохранение...' : (editingMatch ? 'Обновить' : 'Добавить')}
              </button>
              {editingMatch && (
                <button
                  type="button"
                  onClick={resetMatchForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Список новостей */}
      {activeTab === 'news' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Список новостей</h2>
          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(item.date)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editNews(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            {news.length === 0 && (
              <p className="text-center text-gray-500 py-8">Новостей пока нет</p>
            )}
          </div>
        </div>
      )}

      {/* Список матчей */}
      {activeTab === 'matches' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Список матчей</h2>
          <div className="space-y-4">
            {matches.map(item => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.opponent}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(item.date)} • {item.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editMatch(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteMatch(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            {matches.length === 0 && (
              <p className="text-center text-gray-500 py-8">Матчей пока нет</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;