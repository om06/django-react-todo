from django.db import models
from django.contrib.auth.models import User

from . import TaskBucketConstants

__author__ = "Hariom"


class TaskBucket(models.Model):
    """
    To store the to-do bucket
    """
    user       = models.ForeignKey(User, related_name="buckets", on_delete=models.CASCADE)
    name       = models.CharField(max_length=TaskBucketConstants.NAME_MAX_LENGTH)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'name', )

    def __str__(self):
        return self.name


class Task(models.Model):
    """
    To store the tasks
    """
    bucket     = models.ForeignKey(TaskBucket, related_name="tasks", on_delete=models.CASCADE)
    text       = models.TextField()
    is_done    = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s -> %s ..." % (self.bucket, self.text)
