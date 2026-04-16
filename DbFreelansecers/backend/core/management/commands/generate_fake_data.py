from datetime import timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.contracts.models import Contract, Transaction
from apps.orders.models import Order, OrderResponse
from apps.portfolio.models import Portfolio
from apps.users.models import Employer, Freelancer, User


EMPLOYERS = [
    {
        "user": {
            "phone_number": "+7 999 100-10-10",
            "full_name": "Анна Воронцова",
            "email": "anna@northstar-studio.ru",
            "status": "active",
        },
        "description": "Руководитель digital-студии North Star. Ищем сильных исполнителей под веб-проекты, бренд-дизайн и маркетинговые задачи.",
        "card_number": "4111111111111001",
    },
    {
        "user": {
            "phone_number": "+7 999 200-20-20",
            "full_name": "Илья Мартынов",
            "email": "ilya@fintrack.app",
            "status": "active",
        },
        "description": "Продуктовый менеджер в FinTrack. Нужны специалисты под мобильное приложение для личных финансов и внутренние панели аналитики.",
        "card_number": "4111111111111002",
    },
    {
        "user": {
            "phone_number": "+7 999 300-30-30",
            "full_name": "Мария Лебедева",
            "email": "maria@edtech-pro.ru",
            "status": "active",
        },
        "description": "Развиваем EdTech-платформу для онлайн-курсов. Регулярно привлекаем дизайнеров, fullstack-разработчиков и контент-команду.",
        "card_number": "4111111111111003",
    },
]

FREELANCERS = [
    {
        "user": {
            "phone_number": "+7 999 400-40-40",
            "full_name": "Екатерина Смирнова",
            "email": "katya.design@example.com",
            "status": "active",
        },
        "skills": "Figma, UX Research, Design Systems, Prototyping",
        "description": "UX/UI дизайнер с фокусом на SaaS и мобильные интерфейсы. Люблю проектировать понятные пользовательские сценарии и собирать дизайн-системы, которые реально помогают команде.",
        "card_number": "5555555555554001",
        "portfolio": [
            {
                "title": "Редизайн кабинета клиента для FinTrack",
                "description": "Пересобрала структуру личного кабинета, сократила путь до ключевых финансовых сценариев и оформила библиотеку компонентов.",
                "file_links": [
                    "https://example.com/portfolio/fintrack-dashboard",
                    "https://example.com/portfolio/fintrack-ui-kit",
                ],
            },
            {
                "title": "Лендинг онлайн-курса по аналитике",
                "description": "Сделала адаптивный лендинг с акцентом на конверсию в регистрацию и понятную структуру образовательной программы.",
                "file_links": [
                    "https://example.com/portfolio/analytics-course-landing",
                ],
            },
        ],
    },
    {
        "user": {
            "phone_number": "+7 999 500-50-50",
            "full_name": "Дмитрий Кузнецов",
            "email": "dmitry.fullstack@example.com",
            "status": "active",
        },
        "skills": "Python, Django, React, PostgreSQL, Docker",
        "description": "Fullstack-разработчик. Беру проекты, где нужно быстро собрать устойчивый MVP или довести существующий сервис до продакшн-состояния.",
        "card_number": "5555555555555002",
        "portfolio": [
            {
                "title": "CRM для агентства недвижимости",
                "description": "Поднял backend на Django, админку для менеджеров и React-интерфейс для отслеживания сделок и клиентов.",
                "file_links": [
                    "https://example.com/portfolio/real-estate-crm",
                ],
            },
            {
                "title": "Внутренний портал поддержки клиентов",
                "description": "Реализовал систему тикетов, SLA-уведомления и отчёты по команде сопровождения.",
                "file_links": [
                    "https://example.com/portfolio/support-portal",
                ],
            },
        ],
    },
    {
        "user": {
            "phone_number": "+7 999 600-60-60",
            "full_name": "Ольга Белова",
            "email": "olga.content@example.com",
            "status": "active",
        },
        "skills": "Copywriting, Content Strategy, SEO, Email Marketing",
        "description": "Контент-стратег и редактор. Помогаю продуктам объяснять сложные вещи простым языком и строить контент, который приводит лиды.",
        "card_number": "5555555555556003",
        "portfolio": [
            {
                "title": "Контент-стратегия для B2B SaaS",
                "description": "Собрала рубрикатор блога, серию email-цепочек и шаблоны экспертных кейсов для отдела продаж.",
                "file_links": [
                    "https://example.com/portfolio/b2b-saas-content",
                ],
            },
            {
                "title": "SEO-редактура базы знаний",
                "description": "Обновила структуру и тексты help-центра, чтобы повысить органический трафик и сократить нагрузку на поддержку.",
                "file_links": [
                    "https://example.com/portfolio/help-center-seo",
                ],
            },
        ],
    },
    {
        "user": {
            "phone_number": "+7 999 700-70-70",
            "full_name": "Максим Орлов",
            "email": "max.mobile@example.com",
            "status": "active",
        },
        "skills": "React Native, TypeScript, Firebase, Mobile UX",
        "description": "Мобильный разработчик с опытом в React Native. Специализируюсь на приложениях для сервисов подписки, доставки и финтеха.",
        "card_number": "5555555555557004",
        "portfolio": [
            {
                "title": "Приложение для сети фитнес-студий",
                "description": "Реализовал расписание, оплату абонементов, push-уведомления и личный кабинет клиента.",
                "file_links": [
                    "https://example.com/portfolio/fitness-mobile-app",
                ],
            },
            {
                "title": "MVP сервиса учёта подписок",
                "description": "Собрал мобильный клиент, авторизацию, пуши о списаниях и интеграцию с backend API.",
                "file_links": [
                    "https://example.com/portfolio/subscription-tracker",
                ],
            },
        ],
    },
    {
        "user": {
            "phone_number": "+7 999 800-80-80",
            "full_name": "Ирина Павлова",
            "email": "irina.brand@example.com",
            "status": "active",
        },
        "skills": "Brand Design, Illustrator, Packaging, Art Direction",
        "description": "Бренд-дизайнер. Работаю с визуальной айдентикой, упаковкой и презентационными материалами для новых запусков.",
        "card_number": "5555555555558005",
        "portfolio": [
            {
                "title": "Айдентика для кофейного бренда",
                "description": "Разработала логотип, упаковку линейки продуктов и набор шаблонов для соцсетей и презентаций.",
                "file_links": [
                    "https://example.com/portfolio/coffee-branding",
                ],
            },
            {
                "title": "Pitch deck для инвестиционного раунда",
                "description": "Подготовила визуальную подачу для стартапа: структура, графики, типографика и единый стиль с сайтом.",
                "file_links": [
                    "https://example.com/portfolio/startup-pitch-deck",
                ],
            },
        ],
    },
]

ORDER_BLUEPRINTS = [
    {
        "employer_email": "anna@northstar-studio.ru",
        "title": "Редизайн личного кабинета для сервиса подписок",
        "description": "Нужно переработать личный кабинет пользователя: история платежей, управление тарифом, уведомления и раздел поддержки. Ищем специалиста, который умеет проектировать сценарии и собирать UI-kit.",
        "required_skills": "Figma, UX Research, Design Systems",
        "expected_payment": Decimal("120000.00"),
        "deadline_days": 21,
        "responses": [
            {"freelancer_email": "katya.design@example.com", "title": "Сделаю UX-аудит, карту экранов и новый UI-kit.", "status": "принят"},
            {"freelancer_email": "irina.brand@example.com", "title": "Помогу с визуальной частью, если нужен упор на бренд.", "status": "рассматривается"},
        ],
        "contract": {
            "freelancer_email": "katya.design@example.com",
            "status": "активен",
            "payment_amount": Decimal("120000.00"),
            "transaction_status": "зарезервировано",
        },
    },
    {
        "employer_email": "ilya@fintrack.app",
        "title": "Разработка аналитической панели для финансового сервиса",
        "description": "Нужен fullstack-разработчик, который соберёт защищённую панель для аналитиков: фильтры, отчёты по выручке, дашборды и выгрузки CSV.",
        "required_skills": "Python, Django, React, PostgreSQL",
        "expected_payment": Decimal("210000.00"),
        "deadline_days": 30,
        "responses": [
            {"freelancer_email": "dmitry.fullstack@example.com", "title": "Могу взять backend и frontend целиком, с Docker и деплоем.", "status": "принят"},
            {"freelancer_email": "max.mobile@example.com", "title": "Возьму фронтовую часть и API-интеграции.", "status": "отклонен"},
        ],
        "contract": {
            "freelancer_email": "dmitry.fullstack@example.com",
            "status": "завершен",
            "payment_amount": Decimal("210000.00"),
            "transaction_status": "выплачено",
            "employer_rating": 5,
            "freelancer_rating": 5,
        },
    },
    {
        "employer_email": "maria@edtech-pro.ru",
        "title": "Контент и email-цепочки для запуска онлайн-курса",
        "description": "Ищем редактора, который поможет упаковать курс по аналитике данных: лендинг, welcome-цепочка, серия писем дожима и тексты для FAQ.",
        "required_skills": "Copywriting, Content Strategy, Email Marketing",
        "expected_payment": Decimal("85000.00"),
        "deadline_days": 14,
        "responses": [
            {"freelancer_email": "olga.content@example.com", "title": "Подготовлю контент-план запуска и все тексты по цепочке.", "status": "принят"},
        ],
        "contract": {
            "freelancer_email": "olga.content@example.com",
            "status": "активен",
            "payment_amount": Decimal("85000.00"),
            "transaction_status": "зарезервировано",
        },
    },
    {
        "employer_email": "ilya@fintrack.app",
        "title": "Мобильный MVP для учёта подписок",
        "description": "Нужно быстро собрать мобильный MVP: список подписок, календарь списаний, пуши и экран onboarding. Backend API уже есть.",
        "required_skills": "React Native, TypeScript, Mobile UX",
        "expected_payment": Decimal("175000.00"),
        "deadline_days": 25,
        "responses": [
            {"freelancer_email": "max.mobile@example.com", "title": "Соберу MVP на React Native и подключу аналитику событий.", "status": "принят"},
            {"freelancer_email": "dmitry.fullstack@example.com", "title": "Могу помочь на уровне API и общей архитектуры.", "status": "рассматривается"},
        ],
        "contract": {
            "freelancer_email": "max.mobile@example.com",
            "status": "активен",
            "payment_amount": Decimal("175000.00"),
            "transaction_status": "зарезервировано",
        },
    },
    {
        "employer_email": "anna@northstar-studio.ru",
        "title": "Айдентика и упаковка для нового кофейного бренда",
        "description": "Нужен дизайнер под запуск линейки specialty coffee: логотип, система упаковки, шаблоны карточек для маркетплейсов и презентация для дилеров.",
        "required_skills": "Brand Design, Illustrator, Packaging",
        "expected_payment": Decimal("140000.00"),
        "deadline_days": 18,
        "responses": [
            {"freelancer_email": "irina.brand@example.com", "title": "Сделаю айдентику, упаковку и визуальные макеты карточек.", "status": "принят"},
            {"freelancer_email": "katya.design@example.com", "title": "Могу помочь с digital-носителями и лендингом запуска.", "status": "рассматривается"},
        ],
        "contract": {
            "freelancer_email": "irina.brand@example.com",
            "status": "завершен",
            "payment_amount": Decimal("140000.00"),
            "transaction_status": "выплачено",
            "employer_rating": 5,
            "freelancer_rating": 4,
        },
    },
    {
        "employer_email": "maria@edtech-pro.ru",
        "title": "Технический аудит и ускорение платформы курсов",
        "description": "Есть платформа на Django, которая медленно работает на больших потоках студентов. Нужно найти узкие места, ускорить SQL-запросы и предложить план масштабирования.",
        "required_skills": "Python, Django, PostgreSQL, Performance",
        "expected_payment": Decimal("110000.00"),
        "deadline_days": 10,
        "responses": [
            {"freelancer_email": "dmitry.fullstack@example.com", "title": "Проведу аудит SQL и backend-слоя, подготовлю план оптимизации.", "status": "рассматривается"},
        ],
    },
]


class Command(BaseCommand):
    help = "Наполняет базу осмысленными тестовыми данными для демо-платформы фриланса"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Очистить существующие данные пользователей и наполнить базу заново",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            self.stdout.write("Очищаю существующие данные...")
            User.objects.all().delete()

        self.stdout.write("Создаю заказчиков...")
        employers_by_email = {}
        for employer_data in EMPLOYERS:
            user_defaults = employer_data["user"].copy()
            user, _ = User.objects.update_or_create(
                email=user_defaults["email"],
                defaults=user_defaults,
            )
            employer, _ = Employer.objects.update_or_create(
                user=user,
                defaults={
                    "description": employer_data["description"],
                    "card_number": employer_data["card_number"],
                },
            )
            employers_by_email[user.email] = employer

        self.stdout.write("Создаю фрилансеров и портфолио...")
        freelancers_by_email = {}
        for freelancer_data in FREELANCERS:
            user_defaults = freelancer_data["user"].copy()
            user, _ = User.objects.update_or_create(
                email=user_defaults["email"],
                defaults=user_defaults,
            )
            freelancer, _ = Freelancer.objects.update_or_create(
                user=user,
                defaults={
                    "skills": freelancer_data["skills"],
                    "description": freelancer_data["description"],
                    "card_number": freelancer_data["card_number"],
                },
            )
            freelancers_by_email[user.email] = freelancer

            Portfolio.objects.filter(freelancer=freelancer).delete()
            for album in freelancer_data["portfolio"]:
                Portfolio.objects.create(
                    freelancer=freelancer,
                    title=album["title"],
                    description=album["description"],
                    file_links=album["file_links"],
                )

        self.stdout.write("Создаю заказы, отклики, контракты и транзакции...")
        now = timezone.now()
        for index, blueprint in enumerate(ORDER_BLUEPRINTS, start=1):
            employer = employers_by_email[blueprint["employer_email"]]
            order, _ = Order.objects.update_or_create(
                employer=employer,
                title=blueprint["title"],
                defaults={
                    "description": blueprint["description"],
                    "required_skills": blueprint["required_skills"],
                    "expected_payment": blueprint["expected_payment"],
                    "deadline": now + timedelta(days=blueprint["deadline_days"] + index),
                },
            )

            OrderResponse.objects.filter(order=order).delete()
            Contract.objects.filter(order=order).delete()

            for response_data in blueprint.get("responses", []):
                freelancer = freelancers_by_email[response_data["freelancer_email"]]
                OrderResponse.objects.create(
                    freelancer=freelancer,
                    order=order,
                    title=response_data["title"],
                    status=response_data["status"],
                )

            contract_data = blueprint.get("contract")
            if contract_data:
                freelancer = freelancers_by_email[contract_data["freelancer_email"]]
                contract = Contract.objects.create(
                    order=order,
                    freelancer=freelancer,
                    status=contract_data["status"],
                    payment_amount=contract_data["payment_amount"],
                    deadline=order.deadline,
                    employer_rating=contract_data.get("employer_rating"),
                    freelancer_rating=contract_data.get("freelancer_rating"),
                )
                Transaction.objects.create(
                    contract=contract,
                    status=contract_data["transaction_status"],
                    amount=contract.payment_amount,
                )

        self.stdout.write(self.style.SUCCESS("База заполнена осмысленными тестовыми данными."))
