import strawberry
from typing import List, Optional
from .types import PortfolioType
from apps.portfolio.models import Portfolio

@strawberry.type
class PortfolioQueries:
    # Получить конкретный кейс из портфолио по ID
    @strawberry.field
    def portfolio_album_by_id(self, album_id: int) -> Optional[PortfolioType]:
        return Portfolio.objects.filter(album_id=album_id).first()

    # Получить все работы конкретного фрилансера (для его публичной страницы)
    @strawberry.field
    def freelancer_portfolio(self, freelancer_id: int) -> List[PortfolioType]:
        # Сортируем от новых к старым
        return Portfolio.objects.filter(freelancer_id=freelancer_id).order_by('-creation_date')

@strawberry.type
class PortfolioMutations:
    # Мутация для создания нового кейса в портфолио
    @strawberry.mutation
    def create_portfolio_album(
        self, 
        freelancer_id: int, 
        title: str, 
        # Список строк для ссылок (фронтенд должен передать массив URL)
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

    # Мутация для удаления кейса
    @strawberry.mutation
    def delete_portfolio_album(self, album_id: int) -> bool:
        # Пытаемся найти и удалить альбом
        deleted_count, _ = Portfolio.objects.filter(album_id=album_id).delete()
        # Если удалено больше 0 записей, возвращаем True
        return deleted_count > 0