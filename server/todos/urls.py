from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TodoViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = router.urls 