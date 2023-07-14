 
from django.db import models
class Task_category(models.Model):
    id=models.IntegerField(primary_key=True)
    name=models.CharField(max_length=100)

class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length= 200)
    status = models.CharField(max_length= 20)
    category_id=models.ForeignKey("Task_category" , on_delete=models.CASCADE)