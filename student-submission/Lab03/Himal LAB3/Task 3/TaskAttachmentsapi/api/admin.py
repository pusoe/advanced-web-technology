from django.contrib import admin
from .models import Task,Task_category,Task_Attachments

# Register your models here.

admin.site.register(Task)
admin.site.register(Task_category)
admin.site.register(Task_Attachments)

