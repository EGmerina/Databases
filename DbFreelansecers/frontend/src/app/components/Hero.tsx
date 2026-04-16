import { Link } from 'react-router';
import { fetchHomeStats } from '../lib/api';
import { useAsyncData } from '../lib/useAsyncData';

export function Hero() {
  const { data } = useAsyncData(fetchHomeStats, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>

        {/* Geometric patterns */}
        <svg className="absolute top-40 left-20 w-32 h-32 text-primary/5 animate-spin" style={{ animationDuration: '20s' }} viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-40 right-32 w-24 h-24 text-secondary/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="currentColor" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                🚀 Платформа №1 для фриланса
              </span>
            </div>

            <h1 className="font-display font-bold text-primary leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Найдите идеального
              <span className="block text-secondary mt-2">фрилансера</span>
              <span className="block text-accent">за минуты</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Соединяем талантливых специалистов и амбициозные проекты.
              Более 10,000 профессионалов готовы воплотить ваши идеи в жизнь.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/search" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105 transform inline-block">
                Найти специалиста
              </Link>
              <a href="#how-it-works" className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all inline-block">
                Как это работает
              </a>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-display font-bold text-primary">{data?.freelancerCount ?? '...'}</div>
                <div className="text-sm text-muted-foreground">Фрилансеров</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">{data?.orderCount ?? '...'}</div>
                <div className="text-sm text-muted-foreground">Проектов</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-display font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative">
              {/* Mock freelancer cards */}
              <div className="space-y-4">
                {(data?.topFreelancers ?? []).slice(0, 3).map((freelancer, i) => (
                  <div
                    key={freelancer.id}
                    className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
                    style={{
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl font-semibold text-primary">
                        {freelancer.fullName.slice(0, 1)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-lg">{freelancer.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{freelancer.shortDescription}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-secondary">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold">{freelancer.skills.length}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">навыков в профиле</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
