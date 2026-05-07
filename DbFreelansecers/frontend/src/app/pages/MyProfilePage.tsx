import { useState } from 'react';
import { Mail, Phone, MessageCircle, Star, Briefcase, Edit, UserCircle, Building2 } from 'lucide-react';

const myProfile = {
  name: 'Иван Иванов',
  specialty: 'Frontend разработчик',
  avatar: '👨‍💻',
  rate: 3000,
  rating: 4.9,
  completedProjects: 145,
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'Git'],
  bio: 'Опытный Frontend разработчик с 5+ годами опыта. Специализируюсь на создании современных веб-приложений с использованием React и TypeScript. Всегда стремлюсь к чистому коду и лучшим практикам.',
  contacts: {
    email: 'ivan.ivanov@email.com',
    phone: '+7 (999) 123-45-67',
    telegram: '@ivan_ivanov'
  }
};

const myCurrentOrders = [
  {
    id: 1,
    title: 'Разработка административной панели',
    client: 'ООО "ТехноСофт"',
    status: 'В процессе',
    deadline: '15 дней',
    progress: 60,
    payment: '95,000 ₽'
  },
  {
    id: 2,
    title: 'Рефакторинг legacy кода',
    client: 'Startup "InnoTech"',
    status: 'В процессе',
    deadline: '8 дней',
    progress: 85,
    payment: '120,000 ₽'
  },
  {
    id: 3,
    title: 'Создание лендинга для мероприятия',
    client: 'Event Agency "Bright"',
    status: 'Завершён',
    deadline: 'Завершён',
    progress: 100,
    payment: '65,000 ₽'
  }
];

export function MyProfilePage() {
  const [isFreelancer, setIsFreelancer] = useState(true);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">
                Мой профиль
              </h1>
              <p className="text-muted-foreground">
                Управляйте своим профилем и отслеживайте активные проекты
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="bg-card border border-border rounded-2xl p-2 flex gap-2">
              <button
                onClick={() => setIsFreelancer(true)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  isFreelancer
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserCircle className="w-5 h-5" />
                Фрилансер
              </button>
              <button
                onClick={() => setIsFreelancer(false)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  !isFreelancer
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Заказчик
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-5xl">
                  {myProfile.avatar}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {myProfile.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {isFreelancer ? myProfile.specialty : 'Заказчик'}
                  </p>
                </div>

                {isFreelancer ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-xl">{myProfile.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({myProfile.completedProjects} проектов)
                      </span>
                    </div>

                    <div className="px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                      <div className="text-3xl font-bold text-primary">
                        {myProfile.rate} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
                        за час
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl w-full">
                    <div className="text-3xl font-bold text-primary text-center">
                      {myProfile.completedProjects}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      размещено проектов
                    </div>
                  </div>
                )}

                <div className="w-full pt-6 border-t border-border space-y-4 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{myProfile.contacts.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{myProfile.contacts.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{myProfile.contacts.telegram}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <Edit className="w-4 h-4" />
                  Редактировать профиль
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {isFreelancer ? 'О себе' : 'О компании'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {isFreelancer
                  ? myProfile.bio
                  : 'Компания, специализирующаяся на разработке инновационных IT-решений. Мы регулярно размещаем проекты для опытных фрилансеров и всегда ищем талантливых специалистов для совместной работы. Ценим качество, профессионализм и соблюдение сроков.'}
              </p>
            </div>

            {/* Skills - только для фрилансера */}
            {isFreelancer && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Навыки</h3>
                <div className="flex flex-wrap gap-2">
                  {myProfile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-muted text-foreground rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Current Orders */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {isFreelancer ? 'Текущие заказы' : 'Мои проекты'}
              </h3>
              <div className="space-y-4">
                {myCurrentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-xl p-5 hover:shadow-md transition-shadow hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">
                          {order.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{order.client}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs rounded-lg font-medium ${
                          order.status === 'Завершён'
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-blue-500/10 text-blue-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {order.status !== 'Завершён' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-semibold">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{order.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{order.payment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}