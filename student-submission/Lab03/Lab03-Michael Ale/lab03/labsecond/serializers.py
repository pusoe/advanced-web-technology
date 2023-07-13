from rest_framework import serializers
from labsecond.models import task,category
        
class categoryserializer(serializers.ModelSerializer):
    class Meta:
        model=category
        fields='__all__'
        
class taskserializer(serializers.ModelSerializer):
    joinelement=categoryserializer()
    class Meta:
        model=task
        fields='__all__'