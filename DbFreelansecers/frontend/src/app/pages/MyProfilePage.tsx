import { Link, Navigate } from 'react-router';
import { Briefcase, Calendar, DollarSign, Edit, Mail, Phone, Star, UserCircle } from 'lucide-react';
import { fetchMyProfileData, formatDate, formatMoney } from '../lib/api';
import { useAuth } from '../lib/auth';
import { useAsyncData } from '../lib/useAsyncData';

const contractStatusText: Record<string, string> = {
  active: 'Активен',
  completed: 'Завершён',
  cancelled: 'Отменён',
  disputed: 'Спор',
};

export function MyProfilePage() {
  const { currentUser, loading: authLoading } = useAuth();
  const freelancerId = currentUser?.freelancerId;
  const { data, loading, error } = useAsyncData(
    () => {
      if (!freelancerId) {
        return Promise.resolve(null);
      }

      return fetchMyProfileData(freelancerId);
    },
    [freelancerId],
  );

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-muted-foreground">Проверяем авторизацию...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (!freelancerId) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-8">
          <h1 className="mb-3 text-3xl font-bold text-primary">Профиль недоступен</h1>
          <p className="text-muted-foreground">
            У текущего пользователя нет профиля фрилансера.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">Мой профиль</h1>
         
        </div>

        {loading && <p className="text-muted-foreground">Загружаем профиль...</p>}

        {error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-destructive">
            Не удалось загрузить профиль: {error}
          </div>
        )}

        {!loading && !error && !data && (
          <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
            Профиль фрилансера не найден.
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-5xl font-semibold text-primary">
                    {data.profile.fullName.slice(0, 1)}
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      {data.profile.fullName}
                    </h2>
                    <p className="text-muted-foreground">Фрилансер</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-xl">
                      {data.contracts.length}
                    </span>
                    <span className="text-muted-foreground text-sm">контрактов</span>
                  </div>

                  <div className="w-full pt-6 border-t border-border space-y-4 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{data.profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{data.profile.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <UserCircle className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">ID фрилансера: {data.freelancerId}</span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all hover:scale-105">
                    <Edit className="w-4 h-4" />
                    Редактировать профиль
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">О себе</h3>
                <p className="text-muted-foreground leading-relaxed">{data.profile.description}</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Навыки</h3>
                <div className="flex flex-wrap gap-2">
                  {data.profile.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-muted text-foreground rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">Портфолио</h3>
                {data.portfolio.length === 0 ? (
                  <p className="text-muted-foreground">Работы пока не добавлены.</p>
                ) : (
                  <div className="space-y-4">
                    {data.portfolio.map((album) => (
                      <div key={album.albumId} className="border border-border rounded-xl p-5">
                        <h4 className="mb-1 text-lg font-semibold text-foreground">{album.title}</h4>
                        <p className="mb-3 text-sm text-muted-foreground">{album.description}</p>
                        <div className="mb-3 text-xs text-muted-foreground">
                          Добавлено {formatDate(album.creationDate)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {album.fileLinks.map((link) => (
                            <a
                              key={link}
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/15"
                            >
                              Ссылка
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">Мои контракты</h3>
                {data.contracts.length === 0 ? (
                  <div className="rounded-xl bg-muted/50 p-6 text-muted-foreground">
                    Контрактов пока нет. Посмотрите доступные <Link to="/orders" className="text-primary hover:text-secondary">заказы</Link>.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.contracts.map((contract) => (
                      <div
                        key={contract.contractId}
                        className="border border-border rounded-xl p-5 hover:shadow-md transition-shadow hover:border-primary/30"
                      >
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground mb-1">
                              {contract.orderTitle}
                            </h4>
                            <p className="text-sm text-muted-foreground">{contract.employerName}</p>
                          </div>
                          <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {contractStatusText[contract.status] ?? contract.status}
                          </span>
                        </div>

                        <div className="grid gap-3 text-sm sm:grid-cols-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-foreground">{formatMoney(contract.paymentAmount)} ₽</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatDate(contract.deadline)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span>#{contract.contractId}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
