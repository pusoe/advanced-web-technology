from rest_framework import serializers
from .models import Task, TaskCategory

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate(self, attrs):
        title = attrs.get('title', '')
        status = attrs.get('status', '')

        if len(title) < 5:
            raise serializers.ValidationError("Title should be at least 5 characters long.")

        if status.lower() not in ['pending', 'completed']:
            raise serializers.ValidationError("Status should be either 'pending' or 'completed'.")

        task_id = attrs.get('id')
        if not isinstance(task_id, int):
            raise serializers.ValidationError('Enter a valid data type for id.')

        return attrs


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = '__all__'

    def validate(self, attrs):
        name = attrs.get('name', '')

        if len(name) < 3:
            raise serializers.ValidationError("Category name should be at least 3 characters long.")

        category_id = attrs.get('id')
        if not isinstance(category_id, int):
            raise serializers.ValidationError('Enter a valid data type for id.')

        return attrs

