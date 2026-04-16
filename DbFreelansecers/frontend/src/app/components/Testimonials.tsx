export function Testimonials() {
  const testimonials = [
    {
      name: 'Екатерина Морозова',
      role: 'CEO, TechStartup',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Нашли отличного разработчика за пару дней! Проект выполнен качественно и в срок. Платформа очень удобная, все прозрачно.',
      project: 'Разработка мобильного приложения',
      bgColor: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Андрей Козлов',
      role: 'Маркетолог',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Как фрилансер работаю на платформе уже год. Стабильный поток заказов, удобная система платежей. Рекомендую!',
      project: 'SMM и контент-маркетинг',
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Мария Белова',
      role: 'Владелец бизнеса',
      avatar: '👩‍🎨',
      rating: 5,
      text: 'Заказывали дизайн логотипа и фирменного стиля. Получили множество предложений от талантливых дизайнеров. Очень довольны результатом!',
      project: 'Брендинг и айдентика',
      bgColor: 'from-purple-500 to-indigo-500'
    },
  ];

  return (
    <section className="py-24 px-6 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
            Отзывы клиентов
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Что говорят о нас наши пользователи
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              style={{
                animation: `fade-in-scale 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.bgColor}`}></div>

              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-6xl text-secondary/10 group-hover:text-secondary/20 transition-colors">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current text-secondary"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-foreground/90 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Project tag */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  {testimonial.project}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.bgColor} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-display font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Активных фрилансеров' },
            { value: '5,000+', label: 'Завершенных проектов' },
            { value: '98%', label: 'Довольных клиентов' },
            { value: '4.9', label: 'Средний рейтинг' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative"
              style={{
                animation: `fade-in 0.8s ease-out ${0.8 + index * 0.1}s both`
              }}
            >
              <div className="font-display text-5xl font-bold text-primary mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
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
