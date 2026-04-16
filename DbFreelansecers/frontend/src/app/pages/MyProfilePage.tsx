import { Briefcase, FolderKanban, Mail, Phone } from 'lucide-react';
import { fetchMyProfileData, formatDate, formatMoney } from '../lib/api';
import { useAsyncData } from '../lib/useAsyncData';

export function MyProfilePage() {
  const { data, loading, error } = useAsyncData(() => fetchMyProfileData(), []);

  if (loading) {
    return <div className="min-h-screen pt-24 px-6 text-muted-foreground">Загружаем профиль...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-destructive">
          Не удалось открыть профиль: {error ?? 'данные отсутствуют'}
        </div>
      </div>
    );
  }

  const { profile, contracts, portfolio } = data;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">Мой профиль</h1>
          <p className="text-muted-foreground">
            Управляйте профилем и следите за текущими проектами.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-5xl font-semibold text-primary">
                  {profile.fullName.slice(0, 1)}
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">{profile.fullName}</h2>
                  <p className="text-muted-foreground">{profile.shortDescription}</p>
                </div>

                <div className="w-full rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4">
                  <div className="text-3xl font-bold text-primary">{portfolio.length}</div>
                  <div className="text-sm text-muted-foreground">кейсов в портфолио</div>
                </div>

                <div className="w-full space-y-4 border-t border-border pt-6 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{profile.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FolderKanban className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{contracts.length} контрактов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">О себе</h3>
              <p className="leading-relaxed text-muted-foreground">{profile.description}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-lg bg-muted px-4 py-2 text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 text-xl font-semibold text-foreground">Мои контракты</h3>

              {contracts.length === 0 ? (
                <p className="text-muted-foreground">Для этого профиля пока нет контрактов.</p>
              ) : (
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div
                      key={contract.contractId}
                      className="rounded-xl border border-border p-5 transition-shadow hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{contract.orderTitle}</h4>
                          <p className="text-sm text-muted-foreground">{contract.employerName}</p>
                        </div>
                        <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {contract.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span>Срок до {formatDate(contract.deadline)}</span>
                        </div>
                        <div className="font-semibold text-foreground">
                          {formatMoney(contract.paymentAmount)} ₽
                        </div>
                        <div className="text-muted-foreground">
                          Заключён {formatDate(contract.conclusionDate)}
                        </div>
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
