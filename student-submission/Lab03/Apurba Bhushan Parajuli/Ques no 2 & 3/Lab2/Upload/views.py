# Create your views here.
from django.shortcuts import render
#from rest_framework import viewsets
#from Cat.models import Categories, Tasks
#from Cat.serializers import cat_serializer,task_serializer
#from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Files
from .serializer import Upload_serializer

@api_view(['GET'])
def Document_getData(request,id=None):           
    allitem=Files.objects.all()
    serializer=Upload_serializer(allitem,many=True)
    return Response(serializer.data)