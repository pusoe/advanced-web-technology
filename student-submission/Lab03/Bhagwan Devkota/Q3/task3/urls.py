"""
URL configuration for Q3 project.

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
from django.urls import path
from .views import Task3Create,Task3DisplayUpdateDelete
app_name = 'tasks'

urlpatterns = [
    path('api/task3/', Task3Create.as_view(), name='task-list-create'),
    path('api/task3/<int:pk>/', Task3DisplayUpdateDelete.as_view(), name='task-display-update-delete'),
]

