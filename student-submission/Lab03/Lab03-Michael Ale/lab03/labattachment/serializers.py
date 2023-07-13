from rest_framework import serializers
from labsecond.serializers import taskserializer,categoryserializer
from .models import attachment
class attachmentserializer(serializers.ModelSerializer):
    task_attachments=taskserializer()
    class Meta:
        model=attachment
        fields='__all__'