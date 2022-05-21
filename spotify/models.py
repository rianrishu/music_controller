from os import access
from statistics import mode
from django.db import models
from api.models import Room

# Create your models here.
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at= models.DateTimeField(auto_now_add=True)
    refresh_token=models.CharField(max_length=150, null=True, default="AQCg7b66sBZW1p_idPqf81Ag6-A0tI-J2fd9QvHR0jMO3zxVEAZHAtKCtiuWvIJVYprAFwv5b65gnfKHlYa9mmzhnMtU_EhEBoLDQJRw1Y0fRCmsk7NPEH8tBC-4STI57zo")
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)    

class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at= models.DateTimeField(auto_now_add=True)
    song_id=models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)