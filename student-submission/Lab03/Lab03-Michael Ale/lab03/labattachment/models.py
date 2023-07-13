from django.db import models
from labsecond.models import task,category
# Create your models here.
class attachment(models.Model):
    picture=models.ImageField(upload_to="my_picture",blank=True)
    task_attachments=models.ForeignKey(task,on_delete=models.CASCADE) 
    
