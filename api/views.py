from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from api.serializers import UserSerializer, GroupSerializer, CommentReadSerializer, PostReadSerializer, \
    CategoryReadSerializer, CategoryWriteSerializer, CommentWriteSerializer, PostWriteSerializer
from api.models import Comment, Post, Category
from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-last_updated')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['slug', 'category__slug', 'published']
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return PostWriteSerializer
        else:
            return PostReadSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return CommentWriteSerializer
        else:
            return CommentReadSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['slug']
    permission_classes = [permissions.AllowAny]
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return CategoryWriteSerializer
        else:
            return CategoryReadSerializer
