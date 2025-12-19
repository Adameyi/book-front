from rest_framework import serializers
from django.conf import settings
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            Profile.objects.create(user=user)
            return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "id",
            "firstName",
            "lastName",
            "username",
            "profile_image",
            "balance",
            "created_at",
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ("id", "name")


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ("id", "name")


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ("id", "name", "bio")


class BookSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source="category", read_only=True, many=True)
    language_details = LanguageSerializer(source="language", read_only=True)
    author_names = serializers.SerializerMethodField()
    publisher_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_author_names(self, obj):
        return [author.name for author in obj.authors.all()]

    def get_publisher_name(self, obj):
        return [obj.publisher.name] if obj.publisher else []

    def to_representation(self, instance):
        # Get original representation
        representation = super().to_representation(instance)

        if instance.image:
            representation["image"] = settings.MEDIA_URL + str(instance.image)
