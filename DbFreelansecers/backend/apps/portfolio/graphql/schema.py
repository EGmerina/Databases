import strawberry
from typing import List, Optional
from .types import PortfolioType
from apps.portfolio.models import Portfolio

@strawberry.type
class PortfolioQueries:
 
    @strawberry.field
    def portfolio_album_by_id(self, album_id: int) -> Optional[PortfolioType]:
        return Portfolio.objects.filter(album_id=album_id).first()

    @strawberry.field
    def freelancer_portfolio(self, freelancer_id: int) -> List[PortfolioType]:
        return Portfolio.objects.filter(freelancer_id=freelancer_id).order_by('-creation_date')

@strawberry.type
class PortfolioMutations:
    @strawberry.mutation
    def create_portfolio_album(
        self, 
        freelancer_id: int, 
        title: str, 
        file_links: List[str],
        description: Optional[str] = None
    ) -> PortfolioType:
        
        album = Portfolio.objects.create(
            freelancer_id=freelancer_id,
            title=title,
            description=description,
            file_links=file_links
        )
        
        return album


    @strawberry.mutation
    def delete_portfolio_album(self, album_id: int) -> bool:
        deleted_count, _ = Portfolio.objects.filter(album_id=album_id).delete()
        return deleted_count > 0