import strawberry
from typing import List, Optional
from .types import OrderType, OrderResponseType
from apps.orders.models import Order, OrderResponse

@strawberry.type
class OrderQueries:
    # Получить все заказы (например, для ленты заказов)
    @strawberry.field
    def all_orders(self) -> List[OrderType]:
        # В реальном проекте здесь добавляют сортировку (например, новые сверху)
        return Order.objects.all().order_by('-publication_date')

    # Получить конкретный заказ по его ID (для страницы заказа)
    @strawberry.field
    def order_by_id(self, order_id: int) -> Optional[OrderType]:
        return Order.objects.filter(order_id=order_id).first()

    # Получить все отклики к конкретному заказу (для заказчика)
    @strawberry.field
    def order_responses(self, order_id: int) -> List[OrderResponseType]:
        return OrderResponse.objects.filter(order_id=order_id)

@strawberry.type
class OrderMutations:
    # Мутация для создания нового заказа заказчиком
    @strawberry.mutation
    def create_order(
        self, 
        employer_id: int, 
        title: str, 
        description: str, 
        required_skills: str, 
        expected_payment: float, 
        deadline: str
    ) -> OrderType:
        order = Order.objects.create(
            employer_id=employer_id,
            title=title,
            description=description,
            required_skills=required_skills,
            expected_payment=expected_payment,
            deadline=deadline
        )
        return order

    # Мутация для отклика фрилансера на заказ
    @strawberry.mutation
    def create_response(
        self, 
        freelancer_id: int, 
        order_id: int, 
        title: str
    ) -> OrderResponseType:
        response = OrderResponse.objects.create(
            freelancer_id=freelancer_id,
            order_id=order_id,
            title=title,
            status="рассматривается" # Статус по умолчанию
        )
        return response