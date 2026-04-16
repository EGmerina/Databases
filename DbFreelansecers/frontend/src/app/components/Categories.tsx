import { Link } from 'react-router';

export function Categories() {
  const categories = [
    {
      icon: '🎨',
      title: 'Дизайн',
      description: 'UI/UX, графический дизайн, брендинг',
      count: '2,400+ специалистов',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: '💻',
      title: 'Программирование',
      description: 'Web, mobile, backend разработка',
      count: '3,200+ специалистов',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '✍️',
      title: 'Копирайтинг',
      description: 'Тексты, статьи, контент-маркетинг',
      count: '1,800+ специалистов',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '📸',
      title: 'Фото & Видео',
      description: 'Фотосъемка, монтаж, анимация',
      count: '1,500+ специалистов',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: '📱',
      title: 'Маркетинг',
      description: 'SMM, SEO, таргетированная реклама',
      count: '1,200+ специалистов',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎵',
      title: 'Аудио',
      description: 'Озвучка, музыка, звуковой дизайн',
      count: '800+ специалистов',
      gradient: 'from-red-500 to-pink-500'
    },
  ];

  return (
    <section id="categories" className="py-24 px-6 bg-gradient-to-b from-background to-card scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
            Популярные категории
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Найдите идеального специалиста для вашего проекта среди тысяч профессионалов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{
                animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3 text-primary group-hover:text-secondary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.count}</span>
                  <svg
                    className="w-6 h-6 text-secondary transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/search" className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all hover:shadow-lg inline-flex items-center gap-2">
            Найти специалиста
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
