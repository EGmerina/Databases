import strawberry
from typing import List, Optional
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from .types import OrderType, OrderResponseType
from apps.orders.models import Order, OrderResponse
from apps.contracts.models import Contract
from apps.contracts.graphql.types import ContractType


def parse_deadline(value: str):
    parsed_value = parse_datetime(value)
    if parsed_value is None:
        raise ValueError("Некорректный формат срока выполнения")
    if timezone.is_naive(parsed_value):
        return timezone.make_aware(parsed_value)
    return parsed_value


@strawberry.type
class FreelancerResponseSummary:
    response: OrderResponseType
    contract: Optional[ContractType]


@strawberry.type
class EmployerOrderSummary:
    order: OrderType
    responses: List[OrderResponseType]

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

    @strawberry.field
    def freelancer_responses(self, freelancer_id: int) -> List[FreelancerResponseSummary]:
        responses = OrderResponse.objects.filter(freelancer_id=freelancer_id).select_related(
            "order",
            "order__employer",
            "order__employer__user",
        ).order_by("-response_date")

        return [
            FreelancerResponseSummary(
                response=response,
                contract=Contract.objects.filter(
                    order=response.order,
                    freelancer_id=freelancer_id,
                ).first(),
            )
            for response in responses
        ]

    @strawberry.field
    def employer_orders(self, employer_id: int) -> List[EmployerOrderSummary]:
        orders = Order.objects.filter(employer_id=employer_id).order_by("-publication_date")
        return [
            EmployerOrderSummary(
                order=order,
                responses=list(
                    OrderResponse.objects.filter(order=order).select_related(
                        "freelancer",
                        "freelancer__user",
                    ).order_by("-response_date")
                ),
            )
            for order in orders
        ]

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
        parsed_deadline = parse_deadline(deadline)
        order = Order.objects.create(
            employer_id=employer_id,
            title=title,
            description=description,
            required_skills=required_skills,
            expected_payment=expected_payment,
            deadline=parsed_deadline
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
        response, _ = OrderResponse.objects.get_or_create(
            freelancer_id=freelancer_id,
            order_id=order_id,
            defaults={
                "title": title,
                "status": "pending", # Статус по умолчанию
            },
        )
        return response

    @strawberry.mutation
    def delete_response(self, response_id: int, freelancer_id: int) -> bool:
        deleted_count, _ = OrderResponse.objects.filter(
            response_id=response_id,
            freelancer_id=freelancer_id,
        ).delete()
        return deleted_count > 0
