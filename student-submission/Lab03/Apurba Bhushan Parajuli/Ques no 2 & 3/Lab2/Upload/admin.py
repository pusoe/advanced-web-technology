from django.contrib import admin
from .models import Files

class Document (admin.ModelAdmin):
    list_display=['id','uploads', 'Files']
            
admin.site.register(Files,Document)

