from django.db import models
    
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
    
    #List Category by name
    def __str__(self):
        return self.name

# Many Books can have Many Publishers    
class Book(models.Model):
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)
    authors = models.ManyToManyField('Author', related_name='books')
    
    isbn = models.CharField(max_length=30)
    title = models.CharField(unique=True, max_length=255)
    languages = models.CharField(max_length=30, default='English')
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