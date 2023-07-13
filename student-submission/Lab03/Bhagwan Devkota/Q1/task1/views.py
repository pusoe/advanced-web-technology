from django.shortcuts import render

# Create your views here.
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import exception_handler
from .models import Task1
from .serializers import Task1Serializer

class Task1Create(generics.ListCreateAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    
    # in order to save the data in database
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Data stored successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    # inorder to handle any exceptions
    def handle_exception(self, exc):
        response = exception_handler(exc, self.get_exception_handler_context())
        if response is None:
            return super().handle_exception(exc)
        return Response(
            {'detail': 'Sorry! An error occurred'},
            status=response.status_code
        )

class Task1DisplayUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task1.objects.all()
    serializer_class = Task1Serializer
    
    #inorder to update data 
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Data updated successfully'},
                status=status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    #to delete a data
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {'message': 'Data deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )

    #exception handler
    def handle_exception(self, exc):
        response = exception_handler(exc, self.get_exception_handler_context())
        if response is None:
            return super().handle_exception(exc)
        return Response(
            {'detail': 'Sorry! An error occurred'},
            status=response.status_code
        )
