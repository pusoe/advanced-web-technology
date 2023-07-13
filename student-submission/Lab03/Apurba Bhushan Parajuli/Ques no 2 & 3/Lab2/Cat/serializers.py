from rest_framework import serializers
from Cat.models import Tasks, Categories

class cat_serializer(serializers.ModelSerializer):
    class Meta: 
        model= Categories
        fields='__all__'

class task_serializer(serializers.ModelSerializer):
    key=cat_serializer()
    class Meta:
        model= Tasks
        fields= "__all__"