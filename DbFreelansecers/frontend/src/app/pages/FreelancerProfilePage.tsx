import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, FolderKanban, Mail, Phone } from 'lucide-react';
import { fetchFreelancerProfile, formatDate } from '../lib/api';
import { useAsyncData } from '../lib/useAsyncData';

export function FreelancerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const freelancerId = Number(id);
  const { data: freelancer, loading, error } = useAsyncData(
    () => fetchFreelancerProfile(freelancerId),
    [freelancerId],
  );

  if (loading) {
    return <div className="min-h-screen pt-24 px-6 text-muted-foreground">Загружаем профиль...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-destructive">
          Не удалось загрузить профиль: {error}
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Фрилансер не найден</h1>
          <button
            onClick={() => navigate('/freelancers')}
            className="rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white transition-all hover:shadow-lg"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/freelancers')}
          className="group mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Назад к списку фрилансеров</span>
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-5xl font-semibold text-primary">
                  {freelancer.fullName.slice(0, 1)}
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">{freelancer.fullName}</h2>
                  <p className="text-muted-foreground">Свободен для новых проектов</p>
                </div>

                <div className="w-full rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3">
                  <div className="text-3xl font-bold text-primary">{freelancer.portfolio.length}</div>
                  <div className="text-sm text-muted-foreground">работ в портфолио</div>
                </div>

                <div className="w-full space-y-4 border-t border-border pt-6 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{freelancer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{freelancer.phoneNumber}</span>
                  </div>
                </div>

                <a
                  href={`mailto:${freelancer.email}`}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-center text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  Связаться
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">О специалисте</h3>
              <p className="leading-relaxed text-muted-foreground">{freelancer.description}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span key={skill} className="rounded-lg bg-muted px-4 py-2 text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Портфолио</h3>

              {freelancer.portfolio.length === 0 ? (
                <p className="text-muted-foreground">У этого специалиста пока нет работ в портфолио.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {freelancer.portfolio.map((album) => (
                    <div key={album.albumId} className="rounded-xl border border-border p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FolderKanban className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{album.title}</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(album.creationDate)}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{album.description}</p>
                      <div className="text-sm text-primary">
                        Файлов/ссылок: {album.fileLinks.length}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
