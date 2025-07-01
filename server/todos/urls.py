from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CategoryViewSet, TodoViewSet, register_user

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = router.urls + [
    path('register/', register_user, name='register'),
] 