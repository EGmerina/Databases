import { Link } from 'react-router';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Создайте проект',
      description: 'Опишите задачу, укажите бюджет и сроки выполнения',
      icon: '📝',
      color: 'text-pink-500'
    },
    {
      number: '02',
      title: 'Получите отклики',
      description: 'Фрилансеры присылают предложения с ценами и портфолио',
      icon: '💼',
      color: 'text-blue-500'
    },
    {
      number: '03',
      title: 'Выберите исполнителя',
      description: 'Сравните предложения и выберите лучшего специалиста',
      icon: '✨',
      color: 'text-purple-500'
    },
    {
      number: '04',
      title: 'Получите результат',
      description: 'Работайте с фрилансером и получите готовый проект',
      icon: '🎉',
      color: 'text-amber-500'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-card to-background relative overflow-hidden scroll-mt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
            Как это работает
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Всего 4 простых шага от идеи до готового проекта
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              style={{
                animation: `slide-up 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-secondary/50 to-transparent -translate-x-8 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full"></div>
                </div>
              )}

              <div className="relative z-10 text-center group">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full group-hover:bg-secondary/40 transition-all"></div>
                    <div className="relative w-20 h-20 bg-card border-2 border-secondary rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                      <span className="font-display text-3xl font-bold text-secondary">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold mb-3 text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-card border border-border rounded-3xl p-12 shadow-xl">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Готовы начать?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам довольных пользователей и найдите идеального исполнителя для вашего проекта
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/search" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105 transform inline-block">
                Найти фрилансера
              </Link>
              <a href="#categories" className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all hover:shadow-xl hover:scale-105 transform inline-block">
                Смотреть категории
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
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
