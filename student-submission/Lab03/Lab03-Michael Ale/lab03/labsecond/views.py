from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from labsecond.models import task,category
from .serializers import taskserializer,categoryserializer
from rest_framework import status
@api_view(['GET'])
def categorygetData(request,id=None):
    if id != None:                      # b) retrieve a list of all task
        item=category.objects.get(id=id)
        serializer=categoryserializer(item)
        return Response(serializer.data)
    else:                         # c) retrieve a single task by its id 
         allitem=category.objects.all()
         serializer=categoryserializer(allitem,many=True)
         return Response(serializer.data)
     
     
@api_view(['POST'])         # adding a new task in the api 
def categoryaddItem(request):
    serializer=categoryserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])                #d)updating a task by its id 
def categoryupdateItem(request,id=None):
    item=category.objects.get(id=id)
    serializer=categoryserializer(item,data=request.data)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        

@api_view(['DELETE'])                 # e) deleting a task by its id 
def categorydeleteItem(request,id=None):
    item=category.objects.get(id=id)
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
#_________________________________________________________________________________
#_____________________________GETTING Tasks using category________________________
@api_view(['GET'])
def lab2getData(request,id=None):
    if id != None:                      # b) retrieve a list of all task
        item=task.objects.get(id=id)
        serializer=taskserializer(item)
        return Response(serializer.data)
    else:                         # c) retrieve a single task by its id 
         allitem=task.objects.all()
         serializer=taskserializer(allitem,many=True)
         return Response(serializer.data)
