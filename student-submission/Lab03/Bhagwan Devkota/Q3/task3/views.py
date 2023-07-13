import os
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Task3
from .serializers import Task3Serializer

class Task3Create(generics.ListCreateAPIView):
    queryset = Task3.objects.all()
    serializer_class = Task3Serializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(attachments=request.data.get('attachments'))
            return Response(
                {'message': 'Data stored successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class Task3DisplayUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task3.objects.all()
    serializer_class = Task3Serializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        file_path = instance.attachments.path if instance.attachments else None
        if file_path and os.path.exists(file_path):
            with open(file_path, 'rb') as file:
                response = HttpResponse(file.read())
                response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
                return response
        return Response(
            {'detail': 'Attachment not found'},
            status=status.HTTP_404_NOT_FOUND
        )