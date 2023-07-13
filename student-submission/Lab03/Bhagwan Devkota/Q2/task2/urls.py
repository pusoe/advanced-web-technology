"""
URL configuration for Q2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from .views import TaskCreate,TaskDisplayUpdateDestroy,CategoryCreate,CategoryDisplayUpdateDestroy

urlpatterns = [
    path('api/task/', TaskCreate.as_view(), name='task-list-create'),
    path('api/task/<int:pk>/', TaskDisplayUpdateDestroy.as_view(), name='task-display-update-destroy'),
    path('api/category/', CategoryCreate.as_view(), name='category-list-create'),
    path('api/category/<int:pk>/', CategoryDisplayUpdateDestroy.as_view(), name='category-display-update-destroy'),
]
