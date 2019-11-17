import logging
from rest_framework import status, viewsets
from rest_framework.response import Response

from .serializers import (TaskSerializer,
                          TaskListSerializer,
                          TaskBucketSerializer,
                          TaskBucketListSerializer)

__author__ = "Hariom"

logger = logging.getLogger(__name__)


class TaskBucketViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        """
        List the buckets along with its tasks
        :param request:
        :return:
        """
        user    = request.user
        buckets = user.buckets.prefetch_related('tasks').all()

        buckets_list = TaskBucketListSerializer(buckets, many=True).data

        return Response(buckets_list, status=status.HTTP_200_OK)

    @staticmethod
    def retrieve(request, pk=None):
        """
        Fetch the details of single bucket
        :param request:
        :param pk:
        :return:
        """
        user   = request.user
        bucket = user.buckets.filter(pk=pk)

        if not bucket.exists():
            return Response({
                "detail": "Bucket doesn't exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        bucket = bucket.first()

        bucket_data = TaskBucketListSerializer(bucket).data
        return Response(bucket_data, status=status.HTTP_200_OK)

    @staticmethod
    def create(request):
        """
        Create bucket for user
        :param request:
        :return:
        """
        user   = request.user
        bucket = TaskBucketSerializer(data=request.data)

        if not bucket.is_valid():
            return Response({
                "detail": "Bucket is not valid"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            bucket.save(user=user)
            return Response({
                "detail": "Bucket saved successfully"
            }, status=status.HTTP_200_OK)
        except Exception as error:
            # Expected exception is that the instance is not saved in the database because of the unique combination of
            # bucket's name and user
            logger.exception(error)
            return Response(
                {
                    "detail": "User already have bucket with same name"
                }, status=status.HTTP_400_BAD_REQUEST
            )

    @staticmethod
    def update(request, pk=None):
        """
        Update bucket information
        :param request:
        :param pk:
        :return:
        """
        user   = request.user
        bucket = user.buckets.filter(pk=pk)

        if not bucket.exists():
            return Response({
                "detail": "Bucket doesn't exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        bucket = bucket.first()

        try:
            name = request.data["name"]
            bucket.name = name
            bucket.save()

            return Response({
                "detail": "Information updated successfully"
            }, status=status.HTTP_200_OK)
        except KeyError:
            return Response({
                "detail": "Incorrect information"
            }, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def destroy(request, pk=None):
        """
        Delete bucket
        :param request:
        :param pk:
        :return:
        """
        user   = request.user
        bucket = user.buckets.filter(pk=pk)

        if not bucket.exists():
            return Response({
                "detail": "Bucket doesn't exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        bucket = bucket.first()
        bucket.delete()

        return Response({
            "detail": "Bucket deleted successfully"
        }, status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ViewSet):

    @staticmethod
    def create(request):
        """
        Create task
        :param request:
        :return:
        """

        task = TaskSerializer(data=request.data)

        if not task.is_valid():
            return Response({
                "detail": "Unable to add task"
            }, status=status.HTTP_400_BAD_REQUEST)

        task.save()

        return Response({
            "detail": "Task saved successfully"
        }, status=status.HTTP_200_OK)

    @staticmethod
    def update(request, pk=None):
        """
        Update the task in the bucket
        :param request:
        :param pk: Task pk
        :return:
        """

        user   = request.user
        bucket = user.buckets.filter(tasks__pk=pk)

        if not bucket.exists():
            return Response({
                "detail": "Task doesn't belong to user"
            }, status=status.HTTP_400_BAD_REQUEST)

        task = bucket.tasks.get(pk=pk)

        try:
            task.text = request.data["text"]
            task.save()

            return Response({
                "detail": "Task updated successfully"
            }, status=status.HTTP_200_OK)
        except KeyError:
            return Response({
                "detail": "Please enter the text"
            }, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def destroy(request, pk=None):
        """
        Delete the task
        :param request:
        :param pk:
        :return:
        """

        user = request.user

        bucket = user.buckets.filter(tasks__pk=pk)
        if not bucket.exists():
            return Response({
                "detail": "Task doesn't belong to user"
            }, status=status.HTTP_400_BAD_REQUEST)

        task = bucket.tasks.get(pk=pk)

        task.delete()

        return Response({
            "detail": "Task deleted successfully"
        }, status=status.HTTP_200_OK)
