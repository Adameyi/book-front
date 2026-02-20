from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.conf import settings
from .models import *


# Validation to prevent duplicate entries.
# class UniqueFieldValidator:
#     def validate_field(self, value, field_name, model):
#         if model.objects.filter(**{field_name: value}).exists():
#             raise serializers.ValidationError("Author already exists")
#         return value


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A Category with this name already exists!",
            )
        ]
    )

    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        Profile.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "firstName",
            "lastName",
            "username",
            "profileImage",
            "balance",
            "created_at",
        )


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Category.objects.all(),
                message="A Category with this name already exists!",
            )
        ]
    )

    class Meta:
        model = Category
        fields = ("id", "name")


class PublisherSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Publisher.objects.all(),
                message="A Publisher with this name already exists!",
            )
        ]
    )

    class Meta:
        model = Publisher
        fields = ("id", "name")


class LanguageSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Language.objects.all(),
                message="A Category with this name already exists!",
            )
        ]
    )

    class Meta:
        model = Language
        fields = ("id", "name")


class AuthorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Author.objects.all(),
                message="A Category with this name already exists!",
            )
        ]
    )

    class Meta:
        model = Author
        fields = ("id", "name", "bio")


class BookSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source="category", read_only=True, many=True)
    language_details = LanguageSerializer(source="languages", read_only=True, many=True)
    author_names = serializers.SerializerMethodField()
    publisher_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_author_names(self, obj):
        return [author.name for author in obj.authors.all()]

    def get_publisher_name(self, obj):
        return [obj.publisher.name] if obj.publisher else None

    def to_representation(self, instance):
        # Get original representation
        representation = super().to_representation(instance)

        if instance.image:
            request = self.context.get("request")
            if request:
                representation["image"] = request.build_absolute.uri(instance.image.url)
            else:
                # Manual URL Fallback (In case context passed incorrectly).
                representation["image"] = f"http://127.0.0.1:8000{instance.image.url}"
        return representation
