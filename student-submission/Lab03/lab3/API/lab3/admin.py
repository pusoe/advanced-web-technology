from django.contrib import admin
from .models import Task, TaskCategory,TaskAttachments

admin.site.register(Task)
admin.site.register(TaskCategory)
admin.site.register(TaskAttachments)
 
