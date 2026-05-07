import strawberry
from typing import List, Optional
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from .types import ContractType, TransactionType
from apps.contracts.models import Contract, Transaction
from apps.orders.models import OrderResponse


def parse_deadline(value: str):
    parsed_value = parse_datetime(value)
    if parsed_value is None:
        raise ValueError("Некорректный формат срока выполнения")
    if timezone.is_naive(parsed_value):
        return timezone.make_aware(parsed_value)
    return parsed_value

@strawberry.type
class ContractQueries:
    @strawberry.field
    def contract_by_id(self, contract_id: int) -> Optional[ContractType]:
        return Contract.objects.filter(contract_id=contract_id).first()

    @strawberry.field
    def freelancer_contracts(self, freelancer_id: int) -> List[ContractType]:
        return Contract.objects.filter(freelancer_id=freelancer_id)

@strawberry.type
class ContractMutations:
    @strawberry.mutation
    def create_contract(
        self, 
        order_id: int, 
        freelancer_id: int, 
        payment_amount: float, 
        deadline: str
    ) -> ContractType:
        existing_contract = Contract.objects.filter(order_id=order_id).first()
        if existing_contract:
            return existing_contract
        parsed_deadline = parse_deadline(deadline)

        contract = Contract.objects.create(
            order_id=order_id,
            freelancer_id=freelancer_id,
            payment_amount=payment_amount,
            deadline=parsed_deadline,
            status="active"
        )
        
        Transaction.objects.create(
            contract=contract,
            amount=payment_amount,
            status="pending"
        )

        OrderResponse.objects.filter(
            order_id=order_id,
            freelancer_id=freelancer_id,
        ).update(status="accepted")
        
        return contract

    @strawberry.mutation
    def accept_contract(self, contract_id: int, freelancer_id: int) -> ContractType:
        contract = Contract.objects.get(contract_id=contract_id, freelancer_id=freelancer_id)
        contract.status = "active"
        contract.save(update_fields=["status"])
        OrderResponse.objects.filter(
            order=contract.order,
            freelancer_id=freelancer_id,
        ).update(status="accepted")
        return contract

    @strawberry.mutation
    def reject_contract(self, contract_id: int, freelancer_id: int) -> ContractType:
        contract = Contract.objects.get(contract_id=contract_id, freelancer_id=freelancer_id)
        contract.status = "cancelled"
        contract.save(update_fields=["status"])
        OrderResponse.objects.filter(
            order=contract.order,
            freelancer_id=freelancer_id,
        ).update(status="rejected")
        Transaction.objects.filter(contract=contract, status="pending").update(status="refunded")
        return contract

    @strawberry.mutation
    def finish_contract(
        self,
        contract_id: int,
        employer_rating: Optional[int] = None,
        freelancer_rating: Optional[int] = None
    ) -> ContractType:
        contract = Contract.objects.get(contract_id=contract_id)
        
        contract.status = "completed"
        if employer_rating is not None:
            contract.employer_rating = employer_rating
        if freelancer_rating is not None:
            contract.freelancer_rating = freelancer_rating
            
        contract.save()
        
        Transaction.objects.filter(contract=contract, status="pending").update(status="completed")
        
        return contract
