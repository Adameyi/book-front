from django.contrib import admin
from .models import *

admin.site.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'authors', 'publisher', 'created_at')
    
    def display_authors(self, object):
        return ", ".join([author.name for author in object.authors.all()])
    display_authors.short_description = "Authors"

admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Publisher)