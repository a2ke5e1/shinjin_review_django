from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    post = models.ManyToManyField('Post')

class Post(models.Model):

    DRAFT = 1
    PUBLISHED = 2
    UNPUBLISHED = 3

    PUBLISHED_CHOICES = (
        ( DRAFT, "Draft"),
        ( PUBLISHED, "Published" ),
        ( UNPUBLISHED, "Unpublished")
    )


    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    published = models.CharField(max_length=20, choices=PUBLISHED_CHOICES, default=DRAFT)
    published_on = models.DateTimeField()
    last_updated = models.DateTimeField()
    content = models.TextField()

