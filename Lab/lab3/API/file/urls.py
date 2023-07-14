from django.urls import path
from .views import TaskAPI, TaskCategoryAPI, TaskAttachmentAPI

urlpatterns = [
    path('task/', TaskAPI.as_view()),
    path('task/<int:pk>', TaskAPI.as_view()),
    path('category/', TaskCategoryAPI.as_view()),
    path('category/<int:pk>', TaskCategoryAPI.as_view()),
    path('task/attachment/<int:pk>', TaskAttachmentAPI.as_view()),
    path('task/attachment/', TaskAttachmentAPI.as_view()),
]
