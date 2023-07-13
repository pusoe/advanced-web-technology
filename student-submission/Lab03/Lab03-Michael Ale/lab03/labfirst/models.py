from django.db import models

class task(models.Model):            #creating a model called task for database handling 
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=200)
    status=models.CharField(max_length=15)
    
