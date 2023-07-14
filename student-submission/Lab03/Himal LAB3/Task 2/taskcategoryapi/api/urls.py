from django.urls import path
from .views import Taskapi,Categoryapi,Task_Categoryapi


urlpatterns=[
    path('task/',Taskapi.as_view()),
    path('task/<int:pk>/',Taskapi.as_view()),
    path('category/',Categoryapi.as_view()),
    path('category/<int:pk>/',Categoryapi.as_view()),
    path('task/category/<int:pk>/',Task_Categoryapi.as_view()),
    path('task/category/',Task_Categoryapi.as_view()),
]
        