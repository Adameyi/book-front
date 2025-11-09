from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
        
class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('id', 'name')
        
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'bio')
        
