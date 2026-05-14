from django.contrib import admin
from .models import Order, OrderResponse

admin.site.register(OrderResponse)
admin.site.register(Order)