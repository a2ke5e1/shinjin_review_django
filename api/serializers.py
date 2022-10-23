from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Post, Comment, Category
from django.core import serializers as coreserializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CommentReadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        depth = 1
        fields = '__all__'


class CommentWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostReadSerializer(serializers.HyperlinkedModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Post
        depth = 1
        fields = [
            'id',
            'url',
            'slug',
            'title',
      #      'category',
            'description',
            'published',
            'published_on',
            'last_updated',
            'content',
           # 'user'
        ]


class PostWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CategoryReadSerializer(serializers.HyperlinkedModelSerializer):
    post = PostReadSerializer(many=True)
    class Meta:
        model = Category
        depth = 1
        fields = ['id', 'url', 'name', 'slug', 'description', 'post']


class CategoryWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['url', 'name', 'slug', 'description','post' ]
