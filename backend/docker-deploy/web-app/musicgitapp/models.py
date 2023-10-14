from django.db import models
from django.contrib.auth.models import User
# Create your models here.

#model of album, has name, image, and artist
class Album(models.Model):
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,related_name='owns')
    collaborator = models.ManyToManyField(User)
    isPublic = models.BooleanField(default=True)


class Song(models.Model):
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=1000)
    artist = models.ManyToManyField(User)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

class Track(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ManyToManyField(User)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    
    