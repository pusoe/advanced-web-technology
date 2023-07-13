from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from labfirst.models import task
from .serializers import itemserializer
from rest_framework import status

@api_view(['GET'])
def getData(request,id=None):
    if id != None:                      # b) retrieve a list of all task
        item=task.objects.get(id=id)
        serializer=itemserializer(item)
        return Response(serializer.data)
    else:                         # c) retrieve a single task by its id 
         allitem=task.objects.all()
         serializer=itemserializer(allitem,many=True)
         return Response(serializer.data)

@api_view(['POST'])         # adding a new task in the api 
def addItem(request):
    serializer=itemserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])                #d)updating a task by its id 
def updateItem(request,id=None):
    item=task.objects.get(id=id)
    serializer=itemserializer(item,data=request.data)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        

@api_view(['DELETE'])                 # e) deleting a task by its id 
def deleteItem(request,id=None):
    item=task.objects.get(id=id)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

