from django.contrib import admin
from django.urls import include, path
from RestfulAPI.views import insert
from rest_framework import routers
from .views import delete

router = routers.DefaultRouter()
router.register(r'Insert', insert)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path('Model1/<int:pk>/', delete.as_view(), name='task delete'),
]