import React from 'react';

export const ClubStats: React.FC = () => {
  const stats = [
    {
      title: "Чемпион России",
      value: "13 раз",
      description: "Многократный победитель национального чемпионата"
    },
    {
      title: "Кубок России",
      value: "12 раз",
      description: "Обладатель российского трофея"
    },
    {
      title: "Суперкубок России",
      value: "10 раз",
      description: "Победитель Суперкубка России"
    },
    {
      title: "Лига чемпионов",
      value: "6 раз",
      description: "Победитель Лиги чемпионов"
    },
    {
      title: "Чемпионат мира среди клубов",
      value: "1 раз",
      description: "Победитель чемпионата мира по среди клубов"
    },
    {
      title: "Спартакиада сильнеших",
      value: "1 раз",
      description: "Победитель всеройссийской Спартакиады"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zenit-blue dark:text-blue-400 mb-12">
          Достижения клуба
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-custom border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-zenit-blue dark:text-blue-400 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};