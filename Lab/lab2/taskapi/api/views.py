 
from .models import Task,Task_category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import TaskSerializer,CategorySerializer

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
            
    def post(self,request):
        
        id=request.data.get('id')
        serializer=TaskSerializer(data=request.data)
        if serializer.validation(data=request.data):
         if(Task.objects.filter(id=id).exists()):
            error_message="id is already exist"
            return Response({"msg":error_message})
         else:
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
            error_message="id is not available"
            return Response({'msg':error_message},status=status.HTTP_404_NOT_FOUND)
        serializer=TaskSerializer(instance=resource,data=request.data)
        if serializer.validation(data=request.data):
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:  
            msg='No changes'
            return Response({'msg':msg},status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        try:
            resource=Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Categoryapi(APIView):
    def get(self,request,pk=None):
        if pk is not None:
            try:
                resource=Task_category.objects.get(pk=pk)
                serializer=CategorySerializer(resource)
                return Response(serializer.data)
            except Task_category.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            resource=Task_category.objects.all()
            serializer=CategorySerializer(resource ,many=True)
            return Response(serializer.data)
    def post(self,request):
        
        id=request.data.get('id')
        serializer=CategorySerializer(data=request.data)
        if serializer.validation(data=request.data):
        
          if(Task_category.objects.filter(id=id).exists()):
            error_message="Data already exist having this id"
            return Response({"msg":error_message})
          else:
                if serializer.is_valid():
                    serializer.save()
                    msg='Posted successfully'
                    return Response({'msg':msg},status=status.HTTP_201_CREATED)

                else:
                    return Response( status=status.HTTP_400_BAD_REQUEST)
    def put(self, request ,pk=None):
        try:
            resource=Task_category.objects.get(id=pk)
        except Task.DoesNotExist:
            error_message="id is not available"
            return Response({'msg':error_message},status=status.HTTP_404_NOT_FOUND)
        serializer=CategorySerializer(instance=resource,data=request.data)
      
        if serializer.validation(data=request.data):
            if serializer.is_valid():
                serializer.save()
                msg='Data updated succesfully'
                return Response({'msg':msg},status=status.HTTP_200_OK)
        else:  
            msg='No changes '
            return Response({'msg':msg},status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None):
        try:
            resource=Task_category.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        resource.delete()
        message="Category deleted succesfully"
        return Response({'msg':message},status=status.HTTP_204_NO_CONTENT)
        # class for both task and category
class Task_Categoryapi(APIView):
    def get(self,request,pk=None):
        if pk is not None:
            try:
                resource=Task.objects.filter(category_id=pk)
                serializer=TaskSerializer(resource,many=True)
                serialized_data =serializer.data
                
                processed_data=[]
                for task_data in serialized_data:
                   task_id = task_data['id']
                   task_title = task_data['title']
                   task_description = task_data['description']
                   task_category_id=task_data['category_id']
                   task_status=task_data['status']

                #    finding the category name based on the id
                   category=Task_category.objects.get(id=task_category_id)
               
                # creating a dictionary with the processed data
                   processed_task = {
                    'id': task_id,
                    'Title': task_title.lower(),   
                    'Description':task_description,
                    'status':task_status,
                    'Category':category.name  
                   }

                   processed_data.append(processed_task)
                return Response(processed_data,)
            except Task.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            resource=Task.objects.all()
            serializer=TaskSerializer(resource ,many=True)
            return Response(serializer.data)

