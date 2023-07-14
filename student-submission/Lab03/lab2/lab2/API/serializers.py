from rest_framework import serializers
from .models import Task,Task_category

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

    def validation(self,data):
        task_id=data.get("id")
        if type(task_id)==int:
            return True
        else:
           error='Enter valid data type'
           raise serializers.ValidationError(error) 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_category
        fields = '__all__'

    def validation(self,data):
        cat_id=data.get("id")
        if type(cat_id)==int:
            return True
        else:
           error ='Enter valid data type'
           raise serializers.ValidationError(error) 