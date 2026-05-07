import strawberry
from typing import List, Optional
from .types import ContractType, TransactionType
from apps.contracts.models import Contract, Transaction

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
        contract = Contract.objects.create(
            order_id=order_id,
            freelancer_id=freelancer_id,
            payment_amount=payment_amount,
            deadline=deadline,
            status="active"
        )
        
        Transaction.objects.create(
            contract=contract,
            amount=payment_amount,
            status="pending"
        )
        
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
