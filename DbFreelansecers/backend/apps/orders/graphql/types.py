import strawberry
from strawberry import auto
from apps.orders.models import Order, OrderResponse
# Импортируем типы из приложения users (предполагается, что вы их уже создали)
from apps.users.graphql.types import EmployerType, FreelancerType

@strawberry.django.type(Order)
class OrderType:
    order_id: auto
    title: auto
    description: auto
    required_skills: auto
    expected_payment: auto
    deadline: auto
    publication_date: auto
    # Связь: при запросе заказа фронтенд сможет сразу получить данные заказчика
    employer: EmployerType

@strawberry.django.type(OrderResponse)
class OrderResponseType:
    response_id: auto
    title: auto
    status: auto
    response_date: auto
    # Связь с заказом и фрилансером
    order: OrderType
    freelancer: FreelancerType