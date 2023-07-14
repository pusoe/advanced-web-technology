# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Task 
 

# Create your views here.

class Taskapi(APIView):
    def get(self,request,pk=None):
        if pk is not None:
            try:
                resource=Task.objects.get(pk=pk)
                serializer=TaskSerializer(resource)
                return Response(serializer.data)
            except Task.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
             
            resource=Task.objects.all()
            serializer=TaskSerializer(resource ,many=True)
            return Response(serializer.data)
            
    def post(self,request,pk):   
        id=request.data.get('id')
        serializer=TaskSerializer(data=request.data)
        if serializer.is_valid():
                    serializer.save()
                    msg='posted successfully'
                    return Response({'msg':msg},status=status.HTTP_201_CREATED)
        else:
                   
                    return Response( status=status.HTTP_400_BAD_REQUEST)

    def put(self, request ,pk=None):
        try:
            resource=Task.objects.get(id=pk)
        except Task.DoesNotExist:
            error_message="Requested id is not available"
            return Response({'msg':error_message},status=status.HTTP_404_NOT_FOUND)
        serializer=TaskSerializer(instance=resource,data=request.data)
        
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
 
    def delete(self, request, pk=None):
        try:
            resource=Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        resource.delete()
        msg='Deleted successfully'
        return Response({'msg':msg},status=status.HTTP_204_NO_CONTENT)
