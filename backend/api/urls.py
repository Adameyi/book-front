from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("category", CategoryViewset, basename="category")
router.register("book", BookViewset, basename="book")
router.register("author", AuthorViewset, basename="author")
router.register("publisher", PublisherViewset, basename="publisher")
router.register("language", LanguageViewset, basename="language")
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [path("api/", include(router.urls))]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
