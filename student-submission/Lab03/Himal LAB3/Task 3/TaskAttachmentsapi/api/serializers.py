# code for serializers of the model task

from rest_framework import serializers
from .models import Task,Task_category,Task_Attachments

class TaskSerializer(serializers.ModelSerializer):
    # attachments =serializers.FileField(max_length=None,use_url=True)

    class Meta:
        model = Task
        fields = '__all__'


    def update(self, instance, validated_data):
        id=validated_data.get('id')
        
        #     print('serializers called')
        instance.id=validated_data.get('id',instance.id)
        instance.title=validated_data.get('title',instance.title)
        instance.description=validated_data.get("description",instance.description)
        instance.status=validated_data.get('status',instance.status)
        # print(instance)
        instance.save()
        return instance

    def validation(self,data):
        task_id=data.get("id")
        if type(task_id)==int:
            return True
        else:
           error_msg='Integers data type is only accepted please enter valid data type'
           raise serializers.ValidationError(error_msg) 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_category
        fields = '__all__'


    def validation(self,data):
        cat_id=data.get("id")
        # print("validation callled")
        if type(cat_id)==int:
            return True
        else:
           error_msg='Integers data type is only accepted please enter valid data type'
           raise serializers.ValidationError(error_msg) 

class AttachmmentSerializer(serializers.ModelSerializer):
    attachments=serializers.FileField(max_length=None,use_url=True)
    class Meta:
        model = Task_Attachments
        fields = '__all__'