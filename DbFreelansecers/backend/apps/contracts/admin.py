from django.contrib import admin
from .models import Contract, Transaction

admin.site.register(Contract)
admin.site.register(Transaction)