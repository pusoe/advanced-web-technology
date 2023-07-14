from django.db import models

# Create your models here.
class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length= 200)
    status = models.CharField(max_length= 20)
    