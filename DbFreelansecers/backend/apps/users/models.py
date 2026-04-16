from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)  # [cite: 1]
    phone_number = models.CharField(max_length=20, unique=True, verbose_name="Номер телефона")  # [cite: 1]
    full_name = models.CharField(max_length=255, verbose_name="ФИО")  # [cite: 1]
    birth_date = models.DateField(null=True, blank=True, verbose_name="Дата рождения")  # [cite: 1]
    email = models.EmailField(unique=True, verbose_name="Почта")  # [cite: 1]
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")  # [cite: 1]
    gender = models.CharField(max_length=10, null=True, blank=True, verbose_name="Пол")  # [cite: 1]
    status = models.CharField(max_length=50, default="active", verbose_name="Статус")  # [cite: 1]

    def __str__(self):
        return self.full_name

class Employer(models.Model):
    employer_id = models.AutoField(primary_key=True)  # [cite: 2]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employer_profile')  # [cite: 2]
    description = models.TextField(verbose_name="Описание")  # [cite: 2]
    card_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Номер карты")  # [cite: 2]

class Freelancer(models.Model):
    freelancer_id = models.AutoField(primary_key=True)  # [cite: 3]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='freelancer_profile')  # [cite: 3]
    skills = models.TextField(verbose_name="Навыки")  # [cite: 3]
    description = models.TextField(verbose_name="Описание")  # [cite: 3]
    card_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="Номер карты")  # [cite: 3]