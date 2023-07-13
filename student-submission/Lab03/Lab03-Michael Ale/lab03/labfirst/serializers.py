from rest_framework import serializers
from labfirst.models import task
class itemserializer(serializers.ModelSerializer):
    class Meta:
        model=task
        fields='__all__'
