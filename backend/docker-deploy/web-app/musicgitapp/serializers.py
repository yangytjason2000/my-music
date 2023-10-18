from rest_framework import serializers
from django.contrib.auth.models import User  # or your custom User model
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # or your custom User model
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']