import strawberry
from strawberry import auto
from apps.orders.models import Order, OrderResponse
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
    employer: EmployerType

@strawberry.django.type(OrderResponse)
class OrderResponseType:
    response_id: auto
    title: auto
    status: auto
    response_date: auto
    order: OrderType
    freelancer: FreelancerType