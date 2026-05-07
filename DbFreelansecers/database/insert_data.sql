DELETE FROM transactions;
DELETE FROM contracts;
DELETE FROM order_responses;
DELETE FROM orders;
DELETE FROM portfolios;
DELETE FROM freelancers;
DELETE FROM employers;
DELETE FROM authorizations;
DELETE FROM users;

ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
ALTER SEQUENCE authorizations_auth_id_seq RESTART WITH 1;
ALTER SEQUENCE employers_employer_id_seq RESTART WITH 1;
ALTER SEQUENCE freelancers_freelancer_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_order_id_seq RESTART WITH 1;
ALTER SEQUENCE order_responses_response_id_seq RESTART WITH 1;
ALTER SEQUENCE contracts_contract_id_seq RESTART WITH 1;
ALTER SEQUENCE transactions_transaction_id_seq RESTART WITH 1;
ALTER SEQUENCE portfolios_album_id_seq RESTART WITH 1;


INSERT INTO users (phone_number, full_name, birth_date, email, gender, status) VALUES
('+7 (900) 111-11-01', 'Иванов Дмитрий Сергеевич',    '1985-03-12', 'ivanov@example.com',    'male',   'active'),
('+7 (900) 111-11-02', 'Петрова Анна Владимировна',   '1990-07-25', 'petrova@example.com',   'female', 'active'),
('+7 (900) 111-11-03', 'Сидоров Алексей Игоревич',    '1988-11-03', 'sidorov@example.com',   'male',   'active'),
('+7 (900) 111-11-04', 'Козлова Екатерина Павловна',  '1995-01-18', 'kozlova@example.com',   'female', 'active'),
('+7 (900) 111-11-05', 'Новиков Андрей Олегович',     '1982-09-30', 'novikov@example.com',   'male',   'active'),
('+7 (900) 111-11-06', 'Морозова Ольга Дмитриевна',   '1993-05-14', 'morozova@example.com',  'female', 'active'),
('+7 (900) 111-11-07', 'Волков Сергей Николаевич',    '1987-12-08', 'volkov@example.com',    'male',   'blocked'),
('+7 (900) 111-11-08', 'Смирнова Мария Александровна','1998-02-22', 'smirnova@example.com',  'female', 'active'),
('+7 (900) 111-11-09', 'Зайцев Павел Романович',      '1984-06-17', 'zaytsev@example.com',   'male',   'active'),
('+7 (900) 111-11-10', 'Фёдорова Юлия Андреевна',     '1991-10-05', 'fedorova@example.com',  'female', 'active');


-- Авторизации (хеш пароля 'password123' для всех)
INSERT INTO authorizations (user_id, user_login, password_hash, last_login_time) VALUES
(1,  'dmitry_i',   '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-07 14:30:00'),
(2,  'anna_p',     '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-08 09:15:00'),
(3,  'alex_s',     '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-07 22:45:00'),
(4,  'katya_k',    '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-08 07:00:00'),
(5,  'andrey_n',   '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-06 18:20:00'),
(6,  'olga_m',     '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-08 11:10:00'),
(7,  'sergey_v',   '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-04-20 15:00:00'),
(8,  'maria_s',    '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-08 08:30:00'),
(9,  'pavel_z',    '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-07 16:55:00'),
(10, 'yulia_f',    '$2b$12$LJ3m4ys3GZfnYMz8kVsKaOTSCTOzqDQxSwO2YkODzHNYGVcFoOsLC', '2026-05-08 06:40:00');


INSERT INTO employers (user_id, description) VALUES
(1, 'Владелец сети кофеен "Утренний бриз". Ищем разработчиков для автоматизации бизнес-процессов.'),
(2, 'Руководитель отдела маркетинга в IT-компании. Регулярно нанимаю дизайнеров и копирайтеров.'),
(3, 'Основатель стартапа в сфере EduTech. Нужна команда для создания MVP образовательной платформы.'),
(4, 'Менеджер проектов в строительной компании. Требуются специалисты для создания сайта и приложения.'),
(5, 'Директор небольшого интернет-магазина. Постоянно ищу фрилансеров для доработки сайта.');


INSERT INTO freelancers (user_id, skills, description) VALUES
(1, 'Python, Django, PostgreSQL, Docker, REST API',           'Backend-разработчик с 8-летним опытом. Проектирую и создаю высоконагруженные системы.'),
(2, 'Figma, Adobe Photoshop, Illustrator, UI/UX',             'Дизайнер интерфейсов. Создаю современные и удобные макеты для веб и мобильных приложений.'),
(3, 'Java, Spring Boot, Kotlin, Android SDK',                 'Android-разработчик. Разрабатываю нативные приложения любой сложности.'),
(4, 'HTML, CSS, JavaScript, React, TypeScript',               'Frontend-разработчик. Верстаю адаптивные интерфейсы по макетам Figma.'),
(5, 'SEO, Google Ads, Яндекс.Директ, аналитика',              'Специалист по интернет-маркетингу. Настраиваю рекламу и продвигаю сайты.'),
(6, 'PHP, Laravel, MySQL, Redis, Elasticsearch',              'Fullstack-разработчик на PHP. Беру проекты под ключ — от идеи до продакшена.'),
(7, 'Python, Machine Learning, TensorFlow, Data Science',     'Data Scientist. Строю ML-модели для прогнозирования и анализа данных.'),
(8, 'WordPress, WooCommerce, Tilda, ModX',                    'Веб-разработчик на CMS. Быстро собираю сайты и интернет-магазины.'),
(9, 'C++, Unreal Engine, Unity, Game Design',                 'Разработчик игр. Создаю 2D и 3D-игры для ПК и мобильных платформ.'),
(10,'Adobe Premiere, After Effects, DaVinci Resolve',         'Видеомонтажёр и моушн-дизайнер. Монтирую рекламные ролики и YouTube-контент.');


INSERT INTO orders (employer_id, title, description, publication_date, required_skills, expected_payment, deadline) VALUES
(1, 'Разработка API для системы лояльности',
    'Требуется создать REST API для управления бонусной программой сети кофеен. Интеграция с кассовым ПО.',
    '2026-05-01 10:00:00', 'Python, Django, PostgreSQL, REST API', 150000.00,
    '2026-07-01 23:59:59'),
(2, 'Дизайн лендинга для нового продукта',
    'Нужен современный одностраничный сайт для презентации SaaS-продукта. Требуется дизайн в Figma.',
    '2026-05-03 12:30:00', 'Figma, UI/UX, Web Design', 60000.00,
    '2026-06-15 23:59:59'),
(3, 'Создание Android-приложения для онлайн-курсов',
    'MVP приложения: просмотр видеоуроков, тесты, личный кабинет ученика.',
    '2026-04-20 09:00:00', 'Java, Kotlin, Android SDK, REST API', 200000.00,
    '2026-08-01 23:59:59'),
(4, 'Вёрстка интернет-магазина по макетам',
    'Адаптивная вёрстка 12 страниц интернет-магазина на React. Макеты уже готовы в Figma.',
    '2026-04-25 15:45:00', 'HTML, CSS, JavaScript, React, TypeScript', 90000.00,
    '2026-06-30 23:59:59'),
(5, 'Настройка контекстной рекламы',
    'Настроить Яндекс.Директ и Google Ads для интернет-магазина зоотоваров. Бюджет на рекламу — отдельно.',
    '2026-03-01 11:00:00', 'SEO, Google Ads, Яндекс.Директ', 35000.00,
    '2026-04-01 23:59:59'),
(5, 'Разработка блога на Laravel',
    'Блог с админкой, категориями, тегами, комментариями и поиском.',
    '2026-02-15 14:20:00', 'PHP, Laravel, MySQL', 120000.00,
    '2026-04-15 23:59:59'),
(5, 'SEO-аудит сайта',
    'Полный технический и контентный аудит сайта. Отчёт с рекомендациями.',
    '2026-04-10 08:00:00', 'SEO, аналитика', 25000.00,
    '2026-05-10 23:59:59'),
(3, 'Telegram-бот для поддержки клиентов',
    'Бот с автоответами, эскалацией на оператора и интеграцией с CRM.',
    '2026-05-07 16:00:00', 'Python, Aiogram, PostgreSQL', 80000.00,
    '2026-07-15 23:59:59');


INSERT INTO order_responses (freelancer_id, order_id, title, status, response_date) VALUES
(1, 1, 'Готов разработать API с документацией Swagger', 'pending', '2026-05-02 09:30:00'),
(6, 1, 'Есть опыт похожих интеграций с кассовым ПО', 'pending', '2026-05-03 14:15:00'),
(4, 1, 'Могу сделать полный стек: API + фронт', 'rejected', '2026-05-04 11:00:00'),
(2, 2, 'Портфолио лендингов прилагаю в личном сообщении', 'pending', '2026-05-04 10:20:00'),
(10, 2, 'Дизайн + анимация интерфейса', 'pending', '2026-05-05 13:45:00'),
(3, 3, 'Разрабатывал похожее приложение для онлайн-школы', 'accepted', '2026-04-22 18:00:00'),
(4, 3, 'Могу помочь с серверной частью', 'rejected', '2026-04-23 10:30:00'),
(1, 3, 'Backend и API беру на себя', 'rejected', '2026-04-23 12:00:00'),
(4, 4, 'Верстаю React-компоненты любой сложности', 'accepted', '2026-04-27 09:15:00'),
(2, 4, 'Могу и дизайн подкорректировать при необходимости', 'rejected', '2026-04-28 16:40:00'),
(5, 5, 'Настрою рекламу с окупаемостью от 300%', 'accepted', '2026-03-02 08:00:00'),
(6, 6, 'Сделаю блог на Laravel с админкой Filament', 'accepted', '2026-02-16 11:30:00'),
(5, 7, 'Проведу полный SEO-аудит за 3 дня', 'accepted', '2026-04-11 14:00:00');


INSERT INTO contracts (order_id, freelancer_id, status, conclusion_date, payment_amount, deadline, employer_rating, freelancer_rating) VALUES
(3, 3, 'active', '2026-04-25 12:00:00', 190000.00, '2026-08-01 23:59:59', NULL, NULL),
(4, 4, 'active', '2026-04-30 10:00:00', 85000.00, '2026-06-30 23:59:59', NULL, NULL),
(5, 5, 'completed', '2026-03-05 09:00:00', 35000.00, '2026-04-01 23:59:59', 5, 5),
(6, 6, 'completed', '2026-02-20 15:00:00', 115000.00, '2026-04-15 23:59:59', 4, 5),
(7, 5, 'cancelled', '2026-04-12 11:00:00', 25000.00, '2026-05-10 23:59:59', NULL, NULL);

INSERT INTO transactions (contract_id, status, transaction_date, amount) VALUES
(1, 'completed', '2026-04-25 12:05:00', 47500.00), 
(1, 'pending',   '2026-06-01 00:00:00', 47500.00),  
(2, 'completed', '2026-04-30 10:10:00', 42500.00),  
(3, 'completed', '2026-03-05 09:10:00', 35000.00),
(4, 'completed', '2026-02-20 15:30:00', 57500.00),  
(4, 'completed', '2026-04-16 10:00:00', 57500.00),  
(5, 'refunded',  '2026-04-20 14:00:00', 25000.00);

INSERT INTO portfolios (freelancer_id, title, creation_date, description, file_links) VALUES
(1, 'REST API для сервиса доставки', '2025-11-15 00:00:00',
    'Микросервисная архитектура на Django + DRF. 50+ эндпоинтов, интеграция с платёжным шлюзом.',
    '["https://github.com/ivanov/delivery-api", "https://docs.example.com/api/v1"]'),

(2, 'Редизайн интернет-банка', '2025-12-01 00:00:00',
    'Полный редизайн мобильного приложения банка. 80+ экранов в Figma.',
    '["https://figma.com/file/abc123", "https://behance.net/petrova/bank"]'),

(3, 'Приложение для фитнес-клуба', '2026-01-20 00:00:00',
    'Android-приложение: запись на тренировки, покупка абонементов, расписание.',
    '["https://play.google.com/store/apps/fitnessapp", "https://github.com/sidorov/fitness"]'),

(4, 'Админ-панель для CRM', '2025-10-10 00:00:00',
    'React + Ant Design. Дашборды, таблицы с фильтрацией, графики.',
    '["https://crm-demo.example.com", "https://github.com/kozlova/crm-panel"]'),

(5, 'Продвижение интернет-магазина электроники', '2026-02-01 00:00:00',
    'Рост органического трафика на 200% за 6 месяцев. Настройка Яндекс.Директ.',
    '["https://cases.example.com/electronics-seo", "https://cert.example.com/novikov"]'),

(6, 'Социальная сеть для фотографов', '2025-08-05 00:00:00',
    'Laravel + Vue.js. Ленты, подписки, загрузка фото с водяными знаками.',
    '["https://github.com/morozova/photonet", "https://photonet.example.com"]'),

(8, 'Интернет-магазин на WooCommerce', '2026-03-10 00:00:00',
    'Магазин на 500+ товаров. Интеграция с 1С и службами доставки.',
    '["https://shop-demo.example.com", "https://shop-demo.example.com/wp-admin"]');


SELECT 'users' AS table_name, COUNT(*) AS row_count FROM users
UNION ALL
SELECT 'authorizations', COUNT(*) FROM authorizations
UNION ALL
SELECT 'employers', COUNT(*) FROM employers
UNION ALL
SELECT 'freelancers', COUNT(*) FROM freelancers
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_responses', COUNT(*) FROM order_responses
UNION ALL
SELECT 'contracts', COUNT(*) FROM contracts
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'portfolios', COUNT(*) FROM portfolios;
