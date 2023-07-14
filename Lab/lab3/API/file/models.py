from django.db import models

class TaskCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=20)
    category = models.ForeignKey(TaskCategory, on_delete=models.CASCADE)


class TaskAttachments(models.Model):
    id = models.AutoField(primary_key=True)
    attachment = models.FileField(upload_to='task_attachments/', blank=True, null=True)
    Task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

 
