from django.db import models
    
class category(models.Model): #creating a category model 
    name=models.CharField(max_length=50)
    
class task(models.Model):
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=100)
    status=models.CharField(max_length=20)
    joinelement=models.ForeignKey(category,on_delete=models.CASCADE)
    
    