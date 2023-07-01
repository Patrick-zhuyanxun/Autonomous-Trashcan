"""Database URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
import sys
sys.path.append("..")
from server import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", views.api_overview, name="api_overview"), # GET, API overview
    path("get_user", views.get_user, name="get_user"),  # GET, get/ create user's detail
    path("user_update", views.user_update, name="user_update"), # POST, update user's data and trashcan's capacity
    path("trash_update", views.trash_update, name="trash_update"), # POST, update trashcan's state (working, opening, moving, stop)
    path("get_trash_state", views.get_trash_state, name="get_trash_state"),# GET, get trashcan's state
    path("get_work", views.get_work, name="get_work"), # GET, get the first work in the work list
    path("get_rank", views.get_rank, name="get_rank"), # GET, get user_id and weight of top three who's trash weight is lighter or recycle weight is heavier
    path("upload_work", views.upload_work, name="upload_work"), # POST, add a new trashcan work
    path("total_delete", views.total_delete, name="total_delete"),# POST, reset trashcan and delete user and work list
    path("work_delete", views.work_delete, name="work_delete"), # POST, delete the specified work

    # debug
    path("rearrange_work", views.rearrange_work, name="rearrange_work"), # delete work list
    path("user_list", views.user_list, name="user_list"), # get, list user
    path("trash_list", views.trash_list, name="trash_list"), # get, list trashcan
    path("work_list", views.work_list, name="work_list"),  # get, list work
    path("best_trashcan", views.best_trashcan, name="best_trashcan"), # get, get the best trash which match the condition
    path("user_create", views.user_create, name="user_create"), # post, create user
    path("user_delete", views.user_delete, name="user_delete"), # post, delete user
    path("trash_delete", views.trash_delete, name="trash_delete"), # post, delete the trashcan
    path("trash_create", views.trash_create, name="trash_create"), # post, create the trashcan
    path("user_detail/<str:id>", views.get_work, name="get_work"), # get, get the selected user's detail
]
