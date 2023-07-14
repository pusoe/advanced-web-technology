from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer, TaskCategorySerializer
from .models import Task, TaskCategory, TaskAttachments
from django.http import FileResponse, HttpResponseBadRequest
from django.conf import settings
import os

class TaskAPI(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            try:
                resource = Task.objects.get(pk=pk)
                serializer = TaskSerializer(resource)
                return Response(serializer.data)
            except Task.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            resource = Task.objects.all()
            serializer = TaskSerializer(resource, many=True)
            return Response(serializer.data)
    
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.validate(data=request.data):
                serializer.save()
                return Response({'msg': 'Posted successfully'}, status=status.HTTP_201_CREATED)
            else:
                error_message = 'Enter valid data type'
                return Response({'msg': error_message}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        try:
            resource = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TaskSerializer(instance=resource, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        try:
            resource = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskCategoryAPI(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            try:
                resource = TaskCategory.objects.get(pk=pk)
                serializer = TaskCategorySerializer(resource)
                return Response(serializer.data)
            except TaskCategory.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            resource = TaskCategory.objects.all()
            serializer = TaskCategorySerializer(resource, many=True)
            return Response(serializer.data)

class TaskAttachmentAPI(APIView):
    def get(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            attachment = TaskAttachments.objects.get(Task_id=task)
            file_path = os.path.join(settings.MEDIA_ROOT, str(attachment.attachment))
            if os.path.exists(file_path):
                return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
        except TaskAttachments.DoesNotExist:
            pass

        return Response({'msg': 'Attachment not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        attachment = request.FILES.get('attachment')
        if attachment:
            task_attachment, created = TaskAttachments.objects.get_or_create(Task_id=task)
            task_attachment.attachment = attachment
            task_attachment.save()
            return Response({'msg': 'Attachment uploaded successfully'})

        return Response({'msg': 'No attachment provided'}, status=status.HTTP_400_BAD_REQUEST)



