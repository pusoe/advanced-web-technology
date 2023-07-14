from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'


    def update(self, instance, validated_data):
        id=validated_data.get('id')
        # print('serializers called')
        instance.id=validated_data.get('id',instance.id)
        instance.title=validated_data.get('title',instance.title)
        instance.description=validated_data.get("description",instance.description)
        instance.status=validated_data.get('status',instance.status)
        # print(instance)
        instance.save()
        return instance
    def validation(self,data):
        task_id=data.get("id")
        task_description=data.get("description")
       
        if type(task_id)==int:
            if len(task_description)>10:
              return True
            else:
              error_msg='Length of the dascription must be greater than 10'
              raise serializers.ValidationError(error_msg) 
        else:
           error_msg='Integers data type is only accepted please enter valid data type'
           raise serializers.ValidationError(error_msg) 