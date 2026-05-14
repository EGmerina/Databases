import strawberry
from strawberry import auto
from apps.portfolio.models import Portfolio
from apps.users.graphql.types import FreelancerType

@strawberry.django.type(Portfolio)
class PortfolioType:
    album_id: auto
    title: auto
    description: auto
    creation_date: auto
    
    file_links: strawberry.scalars.JSON
    
    freelancer: FreelancerType