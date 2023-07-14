from django.contrib import admin
from .models import Task,Task_category

# Register your models here.
admin.site.register(Task_category)
admin.site.register(Task)
