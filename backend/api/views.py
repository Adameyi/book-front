from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response


class CategoryViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # List all Categories.
    def list(self, request):
        queryset = Category.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class PublisherViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

    # List all Publishers.
    def list(self, request):
        queryset = Publisher.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class AuthorViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    # List all Authors.
    def list(self, request):
        queryset = Author.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Create Author
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.error, status=400)


class LanguageViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    # List all Languages
    def list(self, request):
        queryset = Language.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class BookViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # Create Book
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    # List all Books
    def list(self, request):
        queryset = Book.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    def delete(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=204)
