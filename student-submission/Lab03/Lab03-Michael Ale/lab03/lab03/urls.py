"""
URL configuration for lab03 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from labfirst import views as labfirstviews
from labsecond import views as labsecondviews
from labattachment import views as labattachment
urlpatterns = [
    path('admin/', admin.site.urls),
    #_______________________________LAB FIRST___________________________
    path('display/',labfirstviews.getData),     # b) retrieve a list of all task
    path('display/<int:id>/',labfirstviews.getData), # c) retrieve a single task by its id 
    path('add/',labfirstviews.addItem), # adding a new task in the api 
    path('update/<int:id>',labfirstviews.updateItem),#d)updating a task by its id 
    path('delete/<int:id>/',labfirstviews.deleteItem), # e) deleting a task by its id 
    #_____________________________________________________________________________________________________________
    
    
    #_________________________LAB SECOND____________________________________________________________________
    path('categorydisplay/',labsecondviews.categorygetData),     # b) retrieve a list of all category
    path('categorydisplay/<int:id>/',labsecondviews.categorygetData), # c) retrieve a single category by its id 
    path('categoryadd/',labsecondviews.categoryaddItem), # adding a new category in the api 
    path('categoryupdate/<int:id>',labsecondviews.categoryupdateItem),#d)updating a category by its id 
    path('categorydelete/<int:id>/',labsecondviews.categorydeleteItem), # e) deleting a category by its id 
    ###_______________________________________
    path('lab2display/',labsecondviews.lab2getData),     # b) retrieve a list of all tasks using category
    path('lab2display/<int:id>/',labsecondviews.lab2getData), # c) retrieve a single task by its id using category
    #######______________________________________________________________________________________________________________________
    #_______________________________LAB THIRD__________________________________________________________________________
    path('allinfo/',labattachment.allinfo),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
