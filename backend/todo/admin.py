from django.contrib import admin

from . import models

__author__ = "Hariom"


class CustomTaskBucket(admin.ModelAdmin):
    """
    Custom admin feature for model TaskBucket
    """
    list_display = [
        'name',
        'created_on',
        'updated_on'
    ]

    list_filter = [
        'user'
    ]

    search_fields = [
        'name'
        'user'
    ]


class CustomTask(admin.ModelAdmin):
    """
    Custom admin feature for model Task
    """

    list_display = [
        'bucket',
        'text',
        'is_done',
        'created_on',
        'updated_on'
    ]

    search_fields = [
        'bucket',
        'text'
    ]

    list_filter = [
        'bucket',
        'is_done'
    ]


admin.site.register(models.TaskBucket, CustomTaskBucket)
admin.site.register(models.Task, CustomTask)
