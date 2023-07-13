from django.db import models

# Create your models here.
class Model1 (models.Model):
    title= models.TextField()
    description= models.TextField()
    status= models.TextField()
    ID=models.IntegerField(primary_key=True)