from django.shortcuts import render
#from rest_framework import viewsets
from Cat.models import Categories, Tasks
from Cat.serializers import cat_serializer,task_serializer
#from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def Task_getData(request,id=None):
    if id != None:                      # b) retrieve a list of all task
        item=Tasks.objects.get(id=id)
        serializer=task_serializer(item)
        return Response(serializer.data)
    else:                         # c) retrieve a single task by its id 
         allitem=Tasks.objects.all()
         serializer=task_serializer(allitem,many=True)
         return Response(serializer.data)
    
@api_view(['DELETE'])                 # e) deleting a task by its id 
def Task_deleteItem(request,id=None):
    item=Tasks.objects.get(id=id)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    

