from django.db import models

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    employer = models.ForeignKey('users.Employer', on_delete=models.CASCADE, related_name='orders')
    title = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    required_skills = models.TextField(verbose_name="Необходимые навыки")
    expected_payment = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Предполагаемая плата")
    deadline = models.DateTimeField(verbose_name="Срок выполнения")
    publication_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")

class OrderResponse(models.Model):
    response_id = models.AutoField(primary_key=True)
    freelancer = models.ForeignKey('users.Freelancer', on_delete=models.CASCADE, related_name='responses')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='responses')
    title = models.CharField(max_length=255, verbose_name="Название/Текст отклика")
    status = models.CharField(max_length=50, default="рассматривается", verbose_name="Статус")
    response_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата отклика")
