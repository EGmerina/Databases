import { Link } from 'react-router';
import { fetchHomeStats } from '../lib/api';
import { useAsyncData } from '../lib/useAsyncData';

export function TopFreelancers() {
  const { data, loading, error } = useAsyncData(fetchHomeStats, []);

  return (
    <section id="top-freelancers" className="py-24 px-6 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-4">Топ фрилансеры</h2>
            <p className="max-w-2xl text-xl text-muted-foreground">
              Специалисты с сильным опытом и качественным портфолио.
            </p>
          </div>
          <Link
            to="/search"
            className="inline-block self-start rounded-lg border-2 border-primary px-6 py-3 text-primary transition-all hover:bg-primary hover:text-primary-foreground md:self-auto"
          >
            Смотреть всех
          </Link>
        </div>

        {loading && <p className="text-muted-foreground">Загружаем специалистов...</p>}
        {error && <p className="text-destructive">Не удалось загрузить топ фрилансеров: {error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data?.topFreelancers.map((freelancer, index) => (
            <Link
              key={freelancer.id}
              to={`/freelancer/${freelancer.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animation: `scale-in 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl font-semibold text-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {freelancer.fullName.slice(0, 1)}
                  </div>
                  <div className="w-fit rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-secondary backdrop-blur-sm">
                    {freelancer.skills.length} навыков
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-1 font-display text-xl font-semibold text-primary transition-colors group-hover:text-secondary">
                  {freelancer.fullName}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">{freelancer.shortDescription}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded-full bg-secondary/10 px-3 py-1 text-xs text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-semibold text-primary">{freelancer.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <div className="font-semibold text-primary">{freelancer.phoneNumber}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
