import strawberry
from strawberry import auto
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

@strawberry.type
class AuthPayload:
    user: UserType
    freelancer_id: Optional[int]
    employer_id: Optional[int]
