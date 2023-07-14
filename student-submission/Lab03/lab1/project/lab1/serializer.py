from rest_framework import serializers
from .models import Task 

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


    def update(self, instance, validated_data):
        
        id=validated_data.get('id')
        instance.id=validated_data.get('id',instance.id)
        instance.title=validated_data.get('title',instance.title)
        instance.description=validated_data.get("description",instance.description)
        instance.status=validated_data.get('status',instance.status)
        instance.save()
        return instance

   