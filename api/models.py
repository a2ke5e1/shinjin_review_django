from django.db import models
from django.contrib.auth import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    published_on = models.DateTimeField()
    last_updated = models.DateTimeField()
    content = models.TextField()

