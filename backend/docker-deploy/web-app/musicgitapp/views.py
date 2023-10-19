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
from rest_framework.authtoken.models import Token



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
        user = None
        try:
            user = User.objects.create_user(username=username,password=password,email=email)
        except Exception as e:
            return Response({'message': 'Invalid registration'}, status=status.HTTP_400_BAD_REQUEST) 
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
            token, created = Token.objects.get_or_create(user=user)
            # ,'token': token.key
            return Response({'message': 'login complete'},status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid login'}, status=status.HTTP_401_UNAUTHORIZED)

#login
class UserStatus(APIView):
    def get(self, request):
        user = request.user
        print(request.COOKIES)
        if user.is_authenticated:
            print("login", user.username)
            return Response({'status': True ,"username":user.username},status=status.HTTP_200_OK)
        else:
            print("not login", user.username)
            return Response({'status': False}, status=status.HTTP_200_OK)

#login
class UserList(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/user_list/?username=xxx
return json:
{"user_list": [{"label": "username1", "value": "username1"}, {"label": "username2", "value": "username2"}]}
''')
    def get(self, request):
        subUserString = request.GET.get('username', None)
        if(subUserString != None):
            users = User.objects.filter(username__contains=subUserString).order_by('username')
            users = users[:10]
            res = []
            for u in users:
                tmp = dict()
                tmp['label'] = u.username
                tmp['value'] = u.username
                res.append(tmp)
            # print(res)
              
            return JsonResponse({"user_list":res})
        else:
            return Response({'message': 'username is not provided'}, status=status.HTTP_400_BAD_REQUEST)



class AlbumCreateView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/album/
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
        print(requsetDict)
        name = findInDict(requsetDict,'name')
        if(name == ""):
            return Response({'message': 'name is not provided'}, status=status.HTTP_400_BAD_REQUEST)
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
                print("username",i)
                if (User.objects.get(username=i) is not None):
                    collaboratorlist.append(User.objects.get(username=i))
                elif (User.objects.get(email=i) is not None):
                    collaboratorlist.append(User.objects.get(email=i))
        isPublic = findInDict(requsetDict,'isPublic')
        if (isPublic == 'true'):
            isPublic = True
        else:
            isPublic = False
        
        
        uploaded_file = None
        if 'image' in request.FILES.keys():
            uploaded_file = request.FILES['image']
        if uploaded_file:
            newAlbum = Album(name=name,owner=owner,isPublic=isPublic)
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
            for i in collaboratorlist:
                newAlbum.collaborator.add(i)
            newAlbum.save()
            # You can now perform additional operations on the file or return a success response
            return Response({'message': 'File uploaded and saved successfully'}, status=status.HTTP_201_CREATED)
        else:
            newAlbum = Album(name=name,owner=owner,isPublic=isPublic)
            newAlbum.save()
            for i in collaboratorlist:
                newAlbum.collaborator.add(i)
            newAlbum.save()
            return Response({'message': 'create succes with No image'}, status=status.HTTP_201_CREATED)

            
        return Response({'message': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(operation_description='''
/album/
request body: form data
id: id
name: name
collaborator: [collaborator1,collaborator2]
isPublic: true/false
image: image file
''')
    def put(self, request):
        errorMessage = ""
        errorFlag = False
        requsetDict = request.data
        print(requsetDict)
        id = findInDict(requsetDict,'id')
        if (id == ''):
            return Response({'message': 'id is not provided'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            id = int(id)
        except Exception as e:
            return Response({'message': 'id is not int'}, status=status.HTTP_400_BAD_REQUEST)
        
        obj = Album.objects.get(id=id)
        if obj == None:
            return Response({'message': 'album does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        name = findInDict(requsetDict,'name')
        if (name != ''):
            obj.name = name
        

        collaboratorlist = []
        if 'collaborator' in requsetDict.keys():
            for j in obj.collaborator.all():
                obj.collaborator.remove(j)
            collaborator = findInDict(requsetDict,'collaborator')
            python_list = json.loads(collaborator)
            for i in python_list:
                if (User.objects.get(username=i) is not None):
                    collaboratorlist.append(User.objects.get(username=i))
                elif (User.objects.get(email=i) is not None):
                    collaboratorlist.append(User.objects.get(email=i))
            for c in collaboratorlist:
                obj.collaborator.add(c)
        
        isPublic = findInDict(requsetDict,'isPublic')
        if (isPublic == 'true'):
            obj.isPublic = True
        elif (isPublic == 'false'):
            obj.isPublic = False
        
        obj.save()
        uploaded_file = request.FILES['image']
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
            obj.image = file_path
            # You can now perform additional operations on the file or return a success response
            
        obj.save()
        res = {}
        res['id'] = obj.id
        res['name'] = obj.name
        res['isPublic'] = obj.isPublic
        res['owner'] = obj.owner.username
        collaborators = []
        for c in obj.collaborator.all():
            collaborators.append({"label":c.username,"value":c.username})
        res['collaborators'] = collaborators
        return JsonResponse(res)
    @swagger_auto_schema(operation_description='''
/album/
request body: form data
id: id
''')
    # todo delete file!!!
    def delete(self,request):
        requestDict = request.data
        id = findInDict(requestDict,'id')
        if id != '':
            album = Album.objects.get(id=id)
            if(album):
                album.delete()
                return Response({'message': 'delete success'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'album does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'id is not provided'}, status=status.HTTP_400_BAD_REQUEST)
    

class AlbumListView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/list_album/?username=xxx
return json
{
    "ownerAlbums": [
        {
            "id": 1,
            "name": "album123",
            "owner_id": 1,
            "isPublic": true,
            "owner_name": "1234567",
            "collaborators": [
                {label: "username1", value: "username1"},
                {label: "username1", value: "username1"},
            ]
                
            
        },
        {
            "id": 2,
            "name": "Album1",
            "owner_id": 1,
            "isPublic": true,
            "owner_name": "1234567",
            "collaborators": []
        }
    ],
    "collaboratorAlbums": []
}
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
            user = me

        
        #myAlbums is all albbums which owner is me or collaborator has me
        
        ownerAlbums = Album.objects.filter(owner=user, isPublic=True).union(Album.objects.filter(owner=user, collaborator=me))
        

        ##albums that collaborators contains user
        collaboratorAlbums = Album.objects.filter(collaborator=user, isPublic=True).union((Album.objects.filter(collaborator=user)).intersection((Album.objects.filter(collaborator=me))))
        
        
        responsedict = {}
        ownerAlbumsList = list(ownerAlbums.values())
        for i in ownerAlbumsList:
            del i['image']
            i['owner_name'] = User.objects.get(id=i['owner_id']).username
        
        collaboratorAlbumsList = list(collaboratorAlbums.values())
        for i in collaboratorAlbumsList:
            del i['image']
            i['owner_name'] = User.objects.get(id=i['owner_id']).username
        
        for i in ownerAlbumsList:
            i['collaborators'] = []
            for j in Album.objects.get(id=i['id']).collaborator.all():
                i['collaborators'].append({'label':j.username,'value':j.username})
        for i in collaboratorAlbumsList:
            i['collaborators'] = []
            for j in Album.objects.get(id=i['id']).collaborator.all():
                i['collaborators'].append({'label':j.username,'value':j.username})
        responsedict['ownerAlbums'] = ownerAlbumsList
        responsedict['collaboratorAlbums'] = collaboratorAlbumsList
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
        return JsonResponse({"album_list",elements})




class AlbumImageView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(operation_description='''
/album_image/?id=x

''')
    def get(self, request):
        id = request.GET.get('id', None)
        if id == None:
            return Response({'message': 'id is not provided'}, status=status.HTTP_400_BAD_REQUEST)
        album = Album.objects.get(id=id)
        if album == None:
            return Response({'message': 'album does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        image = album.image
        filepath = image
        print(filepath)
        
        ##returnFileResponse
        return FileResponse(open(filepath, 'rb'), as_attachment=True)


