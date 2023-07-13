from django.shortcuts import render
from .models import attachment
from .serializers import attachmentserializer as profileserializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
    
    
@api_view(['GET'])
def allinfo(request):
    data=attachment.objects.all()
    serializer=profileserializer(data,many=True)
    return Response(serializer.data)

