from django.contrib import admin
from .models import Employer, Freelancer, User

admin.site.register(User)
admin.site.register(Employer)
admin.site.register(Freelancer)