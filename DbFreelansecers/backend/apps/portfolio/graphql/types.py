import strawberry
from strawberry import auto
from apps.portfolio.models import Portfolio
# Импортируем тип фрилансера, чтобы фронтенд мог понять, чье это портфолио
from apps.users.graphql.types import FreelancerType

@strawberry.django.type(Portfolio)
class PortfolioType:
    album_id: auto
    title: auto
    description: auto
    creation_date: auto
    
    # В GraphQL JSON возвращается как специальный тип (Any/JSON)
    file_links: strawberry.scalars.JSON
    
    # Связь с владельцем портфолио
    freelancer: FreelancerType