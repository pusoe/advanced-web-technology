from django.db import models

# Create your models here.
class Categories (models.Model):
    Name= models.CharField(max_length=100)

class Tasks (models.Model):
        title=models.TextField()
        description= models.TextField()
        status=models.TextField()
        key=models.ForeignKey(Categories, on_delete=models.CASCADE)