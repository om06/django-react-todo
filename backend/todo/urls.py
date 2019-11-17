from django.conf.urls import (include,
                              url)
from rest_framework.routers import SimpleRouter

from . import views

__author__ = "Hariom"

router = SimpleRouter(trailing_slash=False)

router.register('buckets', views.TaskBucketViewSet, 'buckets')
router.register('tasks', views.TaskViewSet, 'tasks')

API_URLS = [
    url(r'^api/', include(router.urls))
]


urlpatterns = API_URLS
