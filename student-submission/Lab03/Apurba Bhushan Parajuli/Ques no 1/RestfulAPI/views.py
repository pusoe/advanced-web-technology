from django.shortcuts import render
from requests import Response
from rest_framework import response
from rest_framework import status

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from RestfulAPI.models import Model1
from RestfulAPI.serializers import Serializer1
from rest_framework import generics

class insert (viewsets.ModelViewSet):
    queryset= Model1.objects.all()
    serializer_class= Serializer1

class delete (generics.DestroyAPIView):
    queryset= Model1.objects.all()
    serializer_class= Serializer1
