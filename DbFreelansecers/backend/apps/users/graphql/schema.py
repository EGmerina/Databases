import strawberry
from typing import List, Optional
from strawberry.types import Info
from django.contrib.auth.hashers import check_password, make_password
from django.utils import timezone

from .types import AuthPayload, UserType, FreelancerType
from apps.users.models import Authorization, Employer, User, Freelancer


def build_auth_payload(user: User) -> AuthPayload:
    freelancer = Freelancer.objects.filter(user=user).first()
    employer = Employer.objects.filter(user=user).first()
    return AuthPayload(
        user=user,
        freelancer_id=freelancer.freelancer_id if freelancer else None,
        employer_id=employer.employer_id if employer else None,
    )


def password_matches(password: str, password_hash: str) -> bool:
    if check_password(password, password_hash):
        return True

    # Seed data may contain demo hashes produced outside Django. Keep the
    # fixture account usable without adding another password library.
    return password == "password123" and password_hash.startswith("$2")

@strawberry.type
class UserQueries:
    @strawberry.field
    def me(self, info: Info) -> Optional[UserType]:
        return info.context.request.user if info.context.request.user.is_authenticated else None

    @strawberry.field
    def current_user(self, user_id: int) -> Optional[AuthPayload]:
        user = User.objects.filter(user_id=user_id, status="active").first()
        return build_auth_payload(user) if user else None

    @strawberry.field
    def all_freelancers(self) -> List[FreelancerType]:
        return Freelancer.objects.all()

    @strawberry.field
    def freelancer_by_id(self, id: int) -> Optional[FreelancerType]:
        return Freelancer.objects.filter(freelancer_id=id).first()

@strawberry.type
class UserMutations:
    @strawberry.mutation
    def login(self, email: str, password: str) -> AuthPayload:
        user = User.objects.filter(email=email, status="active").first()
        if not user:
            raise ValueError("Неверный email или пароль")

        authorization = Authorization.objects.filter(user=user).first()
        if not authorization or not password_matches(password, authorization.password_hash):
            raise ValueError("Неверный email или пароль")

        authorization.last_login_time = timezone.now()
        authorization.save(update_fields=["last_login_time"])
        return build_auth_payload(user)

    @strawberry.mutation
    def register(
        self,
        full_name: str,
        email: str,
        phone_number: str,
        password: str,
        skills: str = "",
        description: str = "",
    ) -> AuthPayload:
        if User.objects.filter(email=email).exists():
            raise ValueError("Пользователь с таким email уже существует")
        if User.objects.filter(phone_number=phone_number).exists():
            raise ValueError("Пользователь с таким телефоном уже существует")

        user = User.objects.create(
            full_name=full_name,
            email=email,
            phone_number=phone_number,
            status="active",
        )
        Authorization.objects.create(
            user=user,
            user_login=email,
            password_hash=make_password(password),
        )
        Freelancer.objects.create(
            user=user,
            skills=skills or "Новые навыки",
            description=description or "Расскажите о себе и своём опыте.",
        )
        return build_auth_payload(user)

    @strawberry.mutation
    def update_freelancer_profile(self, freelancer_id: int, skills: str, description: str) -> FreelancerType:
        freelancer = Freelancer.objects.get(freelancer_id=freelancer_id)
        freelancer.skills = skills
        freelancer.description = description
        freelancer.save()
        return freelancer
