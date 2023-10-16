from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator
from .serializers import *
from rest_framework.generics import *
from django.core import serializers
from rest_framework.views import *
from django.contrib.auth.models import User  # or your custom User model
from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .form import *
from django.contrib.auth import authenticate,login
import json
import os
from django.http import JsonResponse
from django.http import FileResponse
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated




def findInDict(json,s):
    if s in json.keys():
        return json[s]
    else:
        return ""
    
def findInPost(json,s):
    if s in json.POST:
        return json[s]
    else:
        return ""


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
# Create your views here.




#create a new account/user
class UserRegistrationView(APIView):
    # queryset = User.objects.all()
    @swagger_auto_schema(operation_description='''
request body:
type: json
{
    "username": "1234567",
    "password": "1234567",
    "email": "1234567@gmail.com",
    
}
                         ''')
    def post(self,request):
        json_data = request.data
        username = json_data['username']
        password = json_data['password']
        email = ""
        if 'email' in request.POST:
            email = json_data['email']
        
        user = User.objects.create_user(username=username,password=password,email=email)
        if user is not None:
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Invalid registration'}, status=status.HTTP_400_BAD_REQUEST)


#login
class UserLogin(APIView):
    @swagger_auto_schema(operation_description='''
request body:
type: json
{
    "username": "1234567", (optional)
    "password": "1234567",
    "email": "1234567@gmail.com"
    
}

                         ''')
    def post(self, request):
        json_data = request.data
        # print(json_data)
        
        username = findInDict(json_data,'username')
        password = findInDict(json_data,'password')
        email = findInDict(json_data,'email')
        user = None
        if email != "":
            user = User.objects.get(email=email)
            user = authenticate(username=user.username,password=password)
        else:
            user = authenticate(username=username,password=password)
        if user is not None:
            print(user.username)
            print(user.password)
            print(user.email)
            login(request, user)
            return Response({'message': 'login complete'},status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid login'}, status=status.HTTP_401_UNAUTHORIZED)

#login
class UserStatus(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            print("login", user.username)
            return Response({'status': True},status=status.HTTP_200_OK)
        else:
            print("not login", user.username)
            return Response({'status': False}, status=status.HTTP_200_OK)
        


class AlbumCreateView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/listalbum/
request body: form data
name: name
collaborator: [collaborator1,collaborator2]
isPublic: true/false
image: image file
''')
    def post(self, request):
        errorMessage = ""
        errorFlag = False
        requsetDict = request.data
        name = findInDict(requsetDict,'name')
        owner = request.user
        ownerUser = User.objects.get(username=owner)
        if ownerUser is None:
            errorMessage += (owner + " does not exist\n")
            errorFlag = True
            return Response({'message': errorMessage}, status=status.HTTP_400_BAD_REQUEST)
        #'[1, 2, 3, 4, 5]' 
        collaboratorlist = []
        if 'collaborator' in requsetDict.keys():
            collaborator = findInDict(requsetDict,'collaborator')
            python_list = json.loads(collaborator)
            for i in python_list:
                if (User.objects.get(username=i) is not None):
                    collaboratorlist.append(User.objects.get(username=i))
                elif (User.objects.get(email=i) is not None):
                    collaboratorlist.append(User.objects.get(email=i))
        isPublic = findInDict(requsetDict,'isPublic')
        uploaded_file = request.FILES['image']
        
        newAlbum = Album(name=name,owner=owner,isPublic=isPublic,image=uploaded_file)
        for i in collaboratorlist:
            newAlbum.collaborator.add(i)
        if uploaded_file:
            # Define a file path where you want to save the uploaded file
            foldername = "../media/"+name.replace(" ",'_')+"/"
            if not os.path.exists(foldername):
                os.mkdir(foldername)
            file_path = foldername + uploaded_file.name

            # Open the file and write the uploaded file data to it
            with open(file_path, 'wb') as destination_file:
                for chunk in uploaded_file.chunks():
                    destination_file.write(chunk)
            newAlbum.image = file_path
            newAlbum.save()
            # You can now perform additional operations on the file or return a success response
            return Response({'message': 'File uploaded and saved successfully'}, status=status.HTTP_201_CREATED)

        return Response({'message': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

class AlbumListView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/listalbum/?username=xxx
''')
    def get(self, request):
        me = request.user
        user = None
        username = request.GET.get('username', None)
        email = request.GET.get('email', None)
        if (username != None):
            user = User.objects.get(username=username)
        elif (email != None):
            user = User.objects.get(email=email)    
        if user == None:
            return Response({'message': 'user does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        # myAlbums = Album.objects.filter(owner=me, collaborator=me)
        
        #myAlbums is all albbums which owner is me or collaborator has me
        
        ownerAlbums = Album.objects.filter(owner=user, isPublic=True) | Album.objects.filter(owner=user, collaborator=me)
        

        ##albums that collaborators contains user
        collaboratorAlbums = Album.objects.filter(collaborator=user, isPublic=True) | ((Album.objects.filter(collaborator=user)).intersection((Album.objects.filter(collaborator=me))))
        
        collaboratorAlbums = collaboratorAlbums.intersection(myAlbums)
        
        responsedict = {}
        responsedict['ownerAlbums'] = list(ownerAlbums.values())
        responsedict['collaboratorAlbums'] = list(collaboratorAlbums.values())
        return JsonResponse(responsedict)

#login required


class AlbumListPublicView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/list_all_album/?page=x&page_size=y
''')
    def get(self,request):
        page = 0
        pagesize = 10
        try:
            page = int(request.GET.get('page', 0))
            pagesize = int(request.GET.get('page_size', 10))
        except Exception as e:
            return Response({'message': 'page or page_size is not int'}, status=status.HTTP_400_BAD_REQUEST)
        # get allAlbums at page number with page of 10
        paginator = Paginator(Album.objects.filter(isPublic=True), pagesize)
        pagcontent = paginator.get_page(page)
        elements = list(page.object_list)
        return JsonResponse(elements)




class AlbumImageView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/albumimage/
request body: json
{
    id: id of album
}
''')
    def post(self, request):
        requestdata = request.data
        id = requestdata['id']
        album = Album.objects.get(id=id)
        if album == None:
            return Response({'message': 'album does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        image = album.image
        filepath = image
        print(filepath)
        
        ##returnFileResponse
        return FileResponse(open(filepath, 'rb'), as_attachment=True)


