import strawberry
from strawberry import auto
from django.db.models import Avg, Count
from typing import Optional
from apps.users.models import User, Employer, Freelancer

@strawberry.django.type(User)
class UserType:
    user_id: auto
    full_name: auto
    email: auto
    phone_number: auto
    status: auto
    registration_date: auto

@strawberry.django.type(Employer)
class EmployerType:
    employer_id: auto
    description: auto
    user: UserType

@strawberry.django.type(Freelancer)
class FreelancerType:
    freelancer_id: auto
    skills: auto
    description: auto
    user: UserType

    @strawberry.field
    def freelancer_rating(self) -> Optional[float]:
        rating = self.contracts.filter(
            status="completed",
            employer_rating__isnull=False,
        ).aggregate(value=Avg("employer_rating"))["value"]
        return float(rating) if rating is not None else None

    @strawberry.field
    def ratings_count(self) -> int:
        return self.contracts.filter(
            status="completed",
            employer_rating__isnull=False,
        ).aggregate(value=Count("employer_rating"))["value"]

@strawberry.type
class AuthPayload:
    user: UserType
    freelancer_id: Optional[int]
    employer_id: Optional[int]
