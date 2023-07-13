from django.db import models

# Create your models here.


class Task1(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20)
    
    def __str__(self):
        return self.title