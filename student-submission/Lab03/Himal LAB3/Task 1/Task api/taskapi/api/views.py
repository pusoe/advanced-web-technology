
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer
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
            # print("Running")
            resource=Task.objects.all()
            # print(resource)
            serializer=TaskSerializer(resource ,many=True)
            return Response(serializer.data)
            
    def post(self,request):
        
        id=request.data.get('id')
        serializer=TaskSerializer(data=request.data)
        if serializer.validation(data=request.data):
         if(Task.objects.filter(id=id).exists()):
            error_message="Entered id is already taken please enter new id"
            return Response({"Data error":error_message})
         else:

        # print(id)
                if serializer.is_valid():
                    serializer.save()
                    msg='Data posted successfully'
                    return Response({'Done':msg},status=status.HTTP_201_CREATED)

                else:
                    # error_message='unable to post data'
                    return Response( status=status.HTTP_400_BAD_REQUEST)


    def put(self, request ,pk=None):
        try:
            resource=Task.objects.get(id=pk)
        except Task.DoesNotExist:
            error_message="Entered id data is not available to update"
            return Response({'Data error':error_message},status=status.HTTP_404_NOT_FOUND)
        serializer=TaskSerializer(instance=resource,data=request.data)
        # serializer.demo()
        if serializer.validation(data=request.data):
            if serializer.is_valid():
                serializer.save()
                msg='Data updated succesfully'
                return Response({'Done':msg},status=status.HTTP_400_BAD_REQUEST)
        else:  
            msg='No changes is applied'
            return Response({'Error':msg},status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk=None):
        try:
            resource=Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            msg='Entered id data is not available'
            return Response({"Error":msg},status=status.HTTP_404_NOT_FOUND)
        resource.delete()
        msg='Data deleted succesfully'
        return Response({"Done":msg},status=status.HTTP_201_CREATED)