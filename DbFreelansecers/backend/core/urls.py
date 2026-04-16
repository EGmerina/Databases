from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView
from .schema import schema # Импортируем схему, которую только что собрали

urlpatterns = [
    path('admin/', admin.site.urls),
    # Единая точка входа для всего фронтенда
    path('graphql/', csrf_exempt(GraphQLView.as_view(schema=schema))),
]
