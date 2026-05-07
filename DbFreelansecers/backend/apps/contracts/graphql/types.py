import strawberry
from strawberry import auto
from typing import List
from apps.contracts.models import Contract, Transaction
from apps.orders.graphql.types import OrderType
from apps.users.graphql.types import FreelancerType

@strawberry.django.type(Transaction)
class TransactionType:
    transaction_id: auto
    status: auto
    transaction_date: auto
    amount: auto

@strawberry.django.type(Contract)
class ContractType:
    contract_id: auto
    status: auto
    conclusion_date: auto
    payment_amount: auto
    deadline: auto
    employer_rating: auto
    freelancer_rating: auto
    
    order: OrderType
    freelancer: FreelancerType
    transactions: List[TransactionType]