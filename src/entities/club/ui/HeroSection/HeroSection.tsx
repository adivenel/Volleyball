import React from 'react';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const handleClick = () => {
    console.log('HeroSection button clicked');
    onOpenModal();
  };

  return (
    <section className="bg-gradient-to-br from-zenit-blue to-zenit-dark text-white text-center py-24 dark:from-gray-800 dark:via-blue-900 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto px-5">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Легенда волейбола
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
          Зенит-Казань — многократный чемпион России, обладатель Кубка Европы и чемпион мира среди клубов!
        </p>
        <button 
          onClick={handleClick}
          className="bg-white text-zenit-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Купить билеты
        </button>
      </div>
    </section>
  );
};