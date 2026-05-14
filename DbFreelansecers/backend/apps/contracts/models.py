from django.db import models

class Contract(models.Model):
    contract_id = models.AutoField(primary_key=True)
    order = models.OneToOneField('orders.Order', on_delete=models.CASCADE, related_name='contract')
    freelancer = models.ForeignKey('users.Freelancer', on_delete=models.CASCADE, related_name='contracts')
    
    status = models.CharField(max_length=50, default="active", verbose_name="Статус")
    conclusion_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата заключения")
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Размер платы")
    deadline = models.DateTimeField(verbose_name="Срок выполнения")
    
    employer_rating = models.IntegerField(null=True, blank=True, verbose_name="Оценка от заказчика")
    freelancer_rating = models.IntegerField(null=True, blank=True, verbose_name="Оценка от фрилансера")

    def __str__(self):
        return f"Контракт #{self.contract_id} по заказу #{self.order_id}"

    class Meta:
        managed = False
        db_table = "contracts"

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='transactions')
    status = models.CharField(max_length=50, default="pending", verbose_name="Статус")
    transaction_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата транзакции")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Сумма")

    def __str__(self):
        return f"Транзакция #{self.transaction_id} на {self.amount}"

    class Meta:
        managed = False
        db_table = "transactions"
