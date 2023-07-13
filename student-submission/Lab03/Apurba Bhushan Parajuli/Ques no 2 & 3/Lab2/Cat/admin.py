from django.contrib import admin
from .models import Categories
from .models import Tasks

class Task (admin.ModelAdmin):
    list_display=['id','title','description','status','key']
            
admin.site.register(Tasks,Task)

class Category (admin.ModelAdmin):
    list_display=['id','Name']

admin.site.register(Categories, Category)
