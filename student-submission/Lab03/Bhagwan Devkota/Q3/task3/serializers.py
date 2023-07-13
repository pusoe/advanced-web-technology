from rest_framework import serializers
from .models import Task3

class Task3Serializer(serializers.ModelSerializer):
    attachments = serializers.FileField(required=False)

    class Meta:
        model = Task3
        fields = '__all__'
