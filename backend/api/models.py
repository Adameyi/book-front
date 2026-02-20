from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


def getDefaultImage():
    default_images = [
        "profiles/profile_placeholder_blue.png",
        "profiles/profile_placeholder_green.png",
        "profiles/profile_placeholder_red.png",
        "profiles/profile_placeholder_purple.png",
        "profiles/profile_placeholder_orange.png",
        "profiles/profile_placeholder_pink.png",
    ]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    profileImage = models.ImageField(
        upload_to="profiles", default=getDefaultImage, null=True, blank=True
    )
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    borrowed_books = models.ManyToManyField("Book", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class Category(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # List Category by name
    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # List Publisher by name
    def __str__(self):
        return self.name


# Many Books can have many languages
class Language(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Many Books can have Many Publishers
class Book(models.Model):
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)
    authors = models.ManyToManyField("Author", related_name="books")
    languages = models.ManyToManyField(Language)

    isbn = models.CharField(max_length=30, unique=True)
    title = models.CharField(unique=True, max_length=255)
    image = models.ImageField(upload_to="covers", null=True, blank=True)
    description = models.CharField(max_length=1000)
    total_copies = models.IntegerField()
    available_copies = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # List Book by title
    def __str__(self):
        return self.title


# Author can have many books
class Author(models.Model):
    name = models.CharField(unique=True, max_length=255)
    bio = models.CharField(unique=True, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # List Author by name
    def __str__(self):
        return self.name
