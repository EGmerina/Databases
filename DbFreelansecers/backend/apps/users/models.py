from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True) 
    phone_number = models.CharField(max_length=20, unique=True, verbose_name="Номер телефона")  
    full_name = models.CharField(max_length=255, verbose_name="ФИО") 
    birth_date = models.DateField(null=True, blank=True, verbose_name="Дата рождения")  
    email = models.EmailField(unique=True, verbose_name="Почта") 
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации") 
    gender = models.CharField(max_length=10, null=True, blank=True, verbose_name="Пол") 
    status = models.CharField(max_length=50, default="active", verbose_name="Статус") 
    card_number = models.CharField(max_length=20, unique=True, null=True, blank=True, verbose_name="Номер карты")

    def __str__(self):
        return self.full_name

    class Meta:
        db_table = "users"

class Employer(models.Model):
    employer_id = models.AutoField(primary_key=True) 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employer_profile')  
    description = models.TextField(verbose_name="Описание")  

    class Meta:
        db_table = "employers"

class Freelancer(models.Model):
    freelancer_id = models.AutoField(primary_key=True) 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='freelancer_profile')  
    skills = models.TextField(verbose_name="Навыки")  
    description = models.TextField(verbose_name="Описание") 

    class Meta:
        db_table = "freelancers"
