from django.contrib import admin
from .models import attachment
# Register your models here.
class profileAdmin(admin.ModelAdmin):
    list_display=['id','picture','task_attachments']
    
admin.site.register(attachment,profileAdmin)
