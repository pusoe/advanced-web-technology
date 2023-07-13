from django.contrib import admin
from django.urls import include, path
from Cat import views as catviews
from rest_framework import routers

#router = routers.DefaultRouter()
#router.register(r'Insert', insert)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('display/', catviews.Task_getData)
    #path('',include(router.urls)),
]