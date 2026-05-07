import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Star, Heart, Mail, Briefcase } from 'lucide-react';

const freelancersData = [
  {
    id: 1,
    name: 'Александра Смирнова',
    specialty: 'UI/UX дизайнер',
    rate: 2500,
    rating: 4.9,
    avatar: '👩‍🎨',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Wireframing', 'User Research'],
    completedProjects: 127,
    bio: 'Профессиональный UI/UX дизайнер с 6+ годами опыта. Создаю интуитивные интерфейсы, которые пользователи любят. Работала с крупными брендами и стартапами.',
    portfolio: [
      { title: 'E-commerce платформа', category: 'Web Design' },
      { title: 'Мобильное приложение для фитнеса', category: 'Mobile UI' },
      { title: 'Дашборд для аналитики', category: 'Dashboard Design' }
    ],
    reviews: [
      { author: 'Петр К.', rating: 5, text: 'Отличный дизайнер! Работа выполнена качественно и в срок.' },
      { author: 'Мария С.', rating: 5, text: 'Очень креативный подход и профессионализм.' }
    ]
  },
  {
    id: 2,
    name: 'Дмитрий Кузнецов',
    specialty: 'Full-stack разработчик',
    rate: 3500,
    rating: 5.0,
    avatar: '👨‍💻',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'Docker'],
    completedProjects: 89,
    bio: 'Full-stack разработчик с глубокими знаниями современных технологий. Специализируюсь на создании масштабируемых веб-приложений и API.',
    portfolio: [
      { title: 'SaaS платформа для управления проектами', category: 'Full-stack' },
      { title: 'API для финтех стартапа', category: 'Backend' },
      { title: 'Real-time чат приложение', category: 'WebSocket' }
    ],
    reviews: [
      { author: 'Игорь А.', rating: 5, text: 'Лучший разработчик, с которым я работал!' },
      { author: 'Елена Р.', rating: 5, text: 'Высокий уровень экспертизы и ответственности.' }
    ]
  },
  {
    id: 3,
    name: 'Елена Петрова',
    specialty: 'Контент-менеджер',
    rate: 1800,
    rating: 4.8,
    avatar: '👩‍💼',
    skills: ['Копирайтинг', 'SEO', 'SMM', 'Контент-стратегия', 'Аналитика', 'Wordpress'],
    completedProjects: 156,
    bio: 'Опытный контент-менеджер и копирайтер. Создаю вовлекающий контент, который конвертирует. Умею работать с различными нишами.',
    portfolio: [
      { title: 'Контент-стратегия для IT компании', category: 'Strategy' },
      { title: 'Ведение блога (100+ статей)', category: 'Content Writing' },
      { title: 'SMM кампания для бренда одежды', category: 'Social Media' }
    ],
    reviews: [
      { author: 'Сергей Н.', rating: 5, text: 'Отличные тексты и своевременная подача материала!' },
      { author: 'Анна В.', rating: 4, text: 'Хороший специалист, всё выполнено качественно.' }
    ]
  },
  {
    id: 4,
    name: 'Михаил Соколов',
    specialty: 'Mobile разработчик',
    rate: 3200,
    rating: 4.9,
    avatar: '👨‍🔧',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST API', 'Mobile UI'],
    completedProjects: 72,
    bio: 'Разработчик мобильных приложений для iOS и Android. Создаю нативные и кросс-платформенные приложения с отличным UX.',
    portfolio: [
      { title: 'Приложение для доставки еды', category: 'React Native' },
      { title: 'Fitness tracker для iOS', category: 'Swift' },
      { title: 'Банковское приложение', category: 'Kotlin' }
    ],
    reviews: [
      { author: 'Олег П.', rating: 5, text: 'Приложение работает безупречно!' },
      { author: 'Виктория М.', rating: 5, text: 'Профессионал своего дела.' }
    ]
  },
  {
    id: 5,
    name: 'Анна Волкова',
    specialty: 'Графический дизайнер',
    rate: 2200,
    rating: 4.7,
    avatar: '👩‍🎨',
    skills: ['Illustrator', 'Photoshop', 'Брендинг', 'Иллюстрация', 'Логотипы', 'Типографика'],
    completedProjects: 143,
    bio: 'Творческий графический дизайнер. Создаю уникальные визуальные решения для брендов. Люблю эксперименты и необычные идеи.',
    portfolio: [
      { title: 'Фирменный стиль для кафе', category: 'Branding' },
      { title: 'Серия иллюстраций для книги', category: 'Illustration' },
      { title: 'Дизайн упаковки продукции', category: 'Package Design' }
    ],
    reviews: [
      { author: 'Дмитрий К.', rating: 5, text: 'Креативный подход и отличный результат!' },
      { author: 'Светлана Т.', rating: 4, text: 'Хороший дизайнер, но были небольшие задержки.' }
    ]
  },
  {
    id: 6,
    name: 'Сергей Новиков',
    specialty: 'Data Scientist',
    rate: 4000,
    rating: 5.0,
    avatar: '👨‍🔬',
    skills: ['Python', 'TensorFlow', 'SQL', 'ML/AI', 'Pandas', 'Jupyter'],
    completedProjects: 54,
    bio: 'Data Scientist с опытом в машинном обучении и аналитике больших данных. Помогаю бизнесу принимать решения на основе данных.',
    portfolio: [
      { title: 'Система рекомендаций для e-commerce', category: 'ML' },
      { title: 'Предиктивная аналитика продаж', category: 'Analytics' },
      { title: 'NLP чат-бот', category: 'AI' }
    ],
    reviews: [
      { author: 'Артем Б.', rating: 5, text: 'Невероятная экспертиза в ML!' },
      { author: 'Юлия Н.', rating: 5, text: 'Сложная задача была решена на отлично.' }
    ]
  },
  {
    id: 7,
    name: 'Ольга Морозова',
    specialty: 'Project Manager',
    rate: 2800,
    rating: 4.9,
    avatar: '👩‍💼',
    skills: ['Agile', 'Scrum', 'Jira', 'Управление командой', 'Планирование', 'Коммуникация'],
    completedProjects: 98,
    bio: 'Опытный проект-менеджер с фокусом на Agile методологии. Умею организовывать команды и доводить проекты до успешного завершения.',
    portfolio: [
      { title: 'Запуск SaaS продукта с нуля', category: 'Project Management' },
      { title: 'Внедрение Scrum в компании', category: 'Process Optimization' },
      { title: 'Координация распределённой команды', category: 'Team Management' }
    ],
    reviews: [
      { author: 'Максим Г.', rating: 5, text: 'Отличный организатор и лидер!' },
      { author: 'Екатерина Л.', rating: 5, text: 'Проект был реализован идеально.' }
    ]
  },
  {
    id: 8,
    name: 'Иван Федоров',
    specialty: 'DevOps инженер',
    rate: 3800,
    rating: 4.8,
    avatar: '👨‍🔧',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform', 'Linux'],
    completedProjects: 67,
    bio: 'DevOps инженер с глубокими знаниями облачных технологий. Автоматизирую процессы и обеспечиваю надёжность инфраструктуры.',
    portfolio: [
      { title: 'Настройка CI/CD pipeline', category: 'DevOps' },
      { title: 'Миграция в Kubernetes', category: 'Infrastructure' },
      { title: 'Автоматизация деплоя AWS', category: 'Cloud' }
    ],
    reviews: [
      { author: 'Алексей Р.', rating: 5, text: 'Профессионал высочайшего уровня!' },
      { author: 'Павел Д.', rating: 4, text: 'Хорошая работа, но не всегда был на связи.' }
    ]
  }
];

export function FreelancerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const freelancer = freelancersData.find(f => f.id === Number(id));

  if (!freelancer) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Фрилансер не найден</h1>
          <button
            onClick={() => navigate('/freelancers')}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
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
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Назад к списку фрилансеров</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-5xl">
                  {freelancer.avatar}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {freelancer.name}
                  </h2>
                  <p className="text-muted-foreground">{freelancer.specialty}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xl">{freelancer.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({freelancer.completedProjects} проектов)
                  </span>
                </div>

                <div className="px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                  <div className="text-3xl font-bold text-primary">
                    {freelancer.rate} ₽
                  </div>
                  <div className="text-sm text-muted-foreground">
                    за час
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <Mail className="w-4 h-4" />
                  Связаться
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl hover:bg-muted transition-all">
                  <Heart className="w-4 h-4" />
                  Добавить в избранное
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">О специалисте</h3>
              <p className="text-muted-foreground leading-relaxed">{freelancer.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Портфолио</h3>
              <div className="space-y-3">
                {freelancer.portfolio.map((project, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-xl p-5 hover:shadow-md transition-all hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{project.title}</h4>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                          {project.category}
                        </span>
                      </div>
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Отзывы</h3>
              <div className="space-y-6">
                {freelancer.reviews.map((review, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-foreground">{review.author}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.text}</p>
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