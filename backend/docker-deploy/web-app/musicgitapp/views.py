from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from rest_framework.generics import *
from rest_framework.views import *
from django.contrib.auth.models import User  # or your custom User model
from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .form import *
from django.contrib.auth import authenticate,login,logout


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
# Create your views here.




#create a new account/user
class UserRegistrationView(APIView):
    # queryset = User.objects.all()
    def post(self,request):
        username = request.POST['username']
        password = request.POST['password']
        email = ""
        if 'email' in request.POST:
            email = request.POST['email']
        
        user = User.objects.create_user(username=username,password=password,email=email)
        if user is not None:
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Invalid registration'}, status=status.HTTP_400_BAD_REQUEST)


#login
class UserLogin(APIView):
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            print(user.username)
            print(user.password)
            print(user.email)
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid login'}, status=status.HTTP_401_UNAUTHORIZED)

class AlbumCreateView(CreateAPIView):
    # queryset = User.objects.all()
    serializer_class = AlbumSerializer

    def perform_create(self, serializer):
        res = serializer.save()