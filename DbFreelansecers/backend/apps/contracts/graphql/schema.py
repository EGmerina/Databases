import strawberry
from typing import List, Optional
from .types import ContractType, TransactionType
from apps.contracts.models import Contract, Transaction

@strawberry.type
class ContractQueries:
    # Получить конкретный контракт по ID
    @strawberry.field
    def contract_by_id(self, contract_id: int) -> Optional[ContractType]:
        return Contract.objects.filter(contract_id=contract_id).first()

    # Получить все контракты конкретного фрилансера (для личного кабинета)
    @strawberry.field
    def freelancer_contracts(self, freelancer_id: int) -> List[ContractType]:
        return Contract.objects.filter(freelancer_id=freelancer_id)

@strawberry.type
class ContractMutations:
    # Мутация для создания контракта
    @strawberry.mutation
    def create_contract(
        self, 
        order_id: int, 
        freelancer_id: int, 
        payment_amount: float, 
        deadline: str
    ) -> ContractType:
        # Создаем контракт
        contract = Contract.objects.create(
            order_id=order_id,
            freelancer_id=freelancer_id,
            payment_amount=payment_amount,
            deadline=deadline,
            status="активен"
        )
        
        # Автоматически создаем первую транзакцию (резервирование средств)
        Transaction.objects.create(
            contract=contract,
            amount=payment_amount,
            status="зарезервировано"
        )
        
        return contract

    # Мутация для завершения контракта с выставлением оценок
    @strawberry.mutation
    def finish_contract(
        self,
        contract_id: int,
        employer_rating: Optional[int] = None,
        freelancer_rating: Optional[int] = None
    ) -> ContractType:
        contract = Contract.objects.get(contract_id=contract_id)
        
        contract.status = "завершен"
        if employer_rating is not None:
            contract.employer_rating = employer_rating
        if freelancer_rating is not None:
            contract.freelancer_rating = freelancer_rating
            
        contract.save()
        
        # Обновляем статус транзакции на "выплачено"
        Transaction.objects.filter(contract=contract, status="зарезервировано").update(status="выплачено")
        
        return contract