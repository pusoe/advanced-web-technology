from django.urls import path
from .views import Taskapi,Categoryapi


urlpatterns=[
    path('task/',Taskapi.as_view()),
    path('task/<int:pk>/',Taskapi.as_view()),
    path('category/',Categoryapi.as_view()),
    path('category/<int:pk>/',Categoryapi.as_view()),
   
]