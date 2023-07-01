from rest_framework import serializers
from .models import User, TrashCan, TodoWork


class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class TrashCan_Serializer(serializers.ModelSerializer):
    class Meta:
        model = TrashCan
        fields = "__all__"

class TodoWork_Serializer(serializers.ModelSerializer):
    class Meta:
        model = TodoWork
        fields = "__all__"