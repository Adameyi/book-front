from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('category', CategoryViewset, basename='category')
router.register('book', BookViewset, basename='book')
router.register('author', AuthorViewset, basename='author')
router.register('publisher', PublisherViewset, basename='publisher')

urlpatterns = router.urls
