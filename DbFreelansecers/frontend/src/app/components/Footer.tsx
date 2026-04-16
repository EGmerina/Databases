import { Zap, Send } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Для заказчиков': [
      'Как найти фрилансера',
      'Разместить проект',
      'Категории услуг',
      'Безопасная сделка',
    ],
    'Для фрилансеров': [
      'Найти работу',
      'Как стать топовым',
      'Создать портфолио',
      'Правила площадки',
    ],
    'Компания': [
      'О нас',
      'Блог',
      'Карьера',
      'Пресс-центр',
    ],
    'Поддержка': [
      'Помощь',
      'Связаться с нами',
      'FAQ',
      'Условия использования',
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">FreelanceHub</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Крупнейшая платформа для поиска фрилансеров и заказчиков в России.
              Безопасные сделки, проверенные специалисты.
            </p>
            <div className="flex gap-4">
              {['telegram', 'vk', 'youtube', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Подпишитесь на рассылку</h3>
              <p className="text-white/80">
                Получайте новости, советы и эксклюзивные предложения
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl hover:bg-white/90 transition-all whitespace-nowrap hover:scale-105">
                <Send className="w-4 h-4" />
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © 2024 FreelanceHub. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Условия использования
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}