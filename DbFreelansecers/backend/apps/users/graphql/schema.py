import strawberry
from typing import List, Optional
from strawberry.types import Info

from .types import UserType, FreelancerType
from apps.users.models import User, Freelancer

@strawberry.type
class UserQueries:
    @strawberry.field
    def me(self, info: Info) -> Optional[UserType]:
        # Логика получения текущего авторизованного пользователя
        return info.context.request.user if info.context.request.user.is_authenticated else None

    @strawberry.field
    def all_freelancers(self) -> List[FreelancerType]:
        return Freelancer.objects.all()

    @strawberry.field
    def freelancer_by_id(self, id: int) -> Optional[FreelancerType]:
        return Freelancer.objects.filter(freelancer_id=id).first()

@strawberry.type
class UserMutations:
    @strawberry.mutation
    def update_freelancer_profile(self, freelancer_id: int, skills: str, description: str) -> FreelancerType:
        freelancer = Freelancer.objects.get(freelancer_id=freelancer_id)
        freelancer.skills = skills
        freelancer.description = description
        freelancer.save()
        return freelancer
