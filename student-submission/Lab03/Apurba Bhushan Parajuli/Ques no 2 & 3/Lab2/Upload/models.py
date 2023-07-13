from django.db import models
from Cat.models import Tasks, Categories

# Create your models here.
class Files(models.Model):
    uploads= models.ImageField(upload_to="my_picture",blank=True)
    Files= models.ForeignKey(Tasks, on_delete=models.CASCADE)