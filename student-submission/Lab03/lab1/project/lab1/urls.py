from django.urls import path
from .views import Taskapi 

urlpatterns=[
    path('task/',Taskapi.as_view()),
    path('task/<int:pk>/',Taskapi.as_view()),

]