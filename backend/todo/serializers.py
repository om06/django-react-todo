from rest_framework import serializers

from . import models

__author__ = "Hariom"


class TaskBucketSerializer(serializers.ModelSerializer):
    """
    Serializer for TaskBucket
    """
    class Meta:
        model  = models.TaskBucket
        fields = [
            'name'
        ]


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for model Task
    """
    class Meta:
        model  = models.Task
        fields = [
            'bucket',
            'text'
        ]


class TaskListSerializer(serializers.ModelSerializer):
    """
    Serializer to list tasks
    """
    class Meta:
        model   = models.Task
        exclude = ['bucket']


class TaskBucketListSerializer(serializers.ModelSerializer):
    """
    Serializer to list tasks
    """
    tasks = TaskListSerializer(many=True)

    class Meta:
        model  = models.TaskBucket
        fields = [
            'id',
            'name',
            'tasks'
        ]
