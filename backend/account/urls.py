from django.conf.urls import url

from . import views

__author__ = "Hariom"

API_URLS = [
    # Authentication API
    url(r'^api/login$', views.Login.as_view(), name='login')
]


urlpatterns = API_URLS
