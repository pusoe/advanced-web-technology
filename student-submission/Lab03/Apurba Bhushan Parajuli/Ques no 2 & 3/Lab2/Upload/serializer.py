from rest_framework import serializers
from .models import Files
from Cat.serializers import cat_serializer, task_serializer

class Upload_serializer(serializers.ModelSerializer):
    Files=task_serializer()
    class Meta: 
        model= Files
        fields='__all__'