from rest_framework import serializers
from RestfulAPI.models import Model1
class Serializer1 (serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Model1
        fields="__all__"
