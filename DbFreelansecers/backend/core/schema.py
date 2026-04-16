import strawberry
from strawberry_django.optimizer import DjangoOptimizerExtension

from apps.contracts.graphql.schema import ContractMutations, ContractQueries
from apps.orders.graphql.schema import OrderMutations, OrderQueries
from apps.portfolio.graphql.schema import PortfolioMutations, PortfolioQueries
from apps.users.graphql.schema import UserMutations, UserQueries


@strawberry.type
class Query(UserQueries, OrderQueries, ContractQueries, PortfolioQueries):
    pass


@strawberry.type
class Mutation(
    UserMutations,
    OrderMutations,
    ContractMutations,
    PortfolioMutations,
):
    pass


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension(), # Эта строчка решает проблему N+1
    ]
)
