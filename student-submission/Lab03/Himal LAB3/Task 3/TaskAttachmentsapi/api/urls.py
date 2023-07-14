from django.urls import path
from .views import Taskapi,Categoryapi,Task_Categoryapi,Task_Attachmentsapi,Attachmentsapi


urlpatterns=[
    path('task/',Taskapi.as_view()),
    path('task/<int:pk>/',Taskapi.as_view()),
    path('category/',Categoryapi.as_view()),
    path('category/<int:pk>/',Categoryapi.as_view()),
    path('task/category/<int:pk>/',Task_Categoryapi.as_view()),
    path('task/category/',Task_Categoryapi.as_view()),
    path('task/attachments/<int:pk>/',Task_Attachmentsapi.as_view()),
    path('attachments/<int:pk>/',Attachmentsapi.as_view()),
    path('attachments/',Attachmentsapi.as_view()),

]
        