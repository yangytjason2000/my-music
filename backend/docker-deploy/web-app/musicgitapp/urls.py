from django.urls import path

from . import views
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("", views.index, name="index"),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('user_status/', views.UserStatus.as_view(), name='userstatus'),
    path('album/', views.AlbumCreateView.as_view(), name='album'),
    path('list_album/', views.AlbumListView.as_view(), name='list_album'),
    path('album_image/', views.AlbumImageView.as_view(), name='album_image'),
    path('list_all_album/', views.AlbumListPublicView.as_view(), name='list_all_album'),
    path('user_list/', views.UserList.as_view(), name='user_list'),
    path('user_image/', views.UserImageView.as_view(), name='user_image'),
    path("song/",views.SongView.as_view(),name="song"),
]