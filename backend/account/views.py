import logging
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

__author__ = "Hariom"

logger = logging.getLogger(__name__)


class Login(ObtainAuthToken):
    """
    Used to return authenticate the user with the help of his username and password, Also we are returning his role
    along with the token

    Reference :- https://stackoverflow.com/questions/35266636/override-the-authtoken-views-in-django-rest
    """
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'token'       : token.key,
                'first_name'  : user.first_name,
                'last_name'   : user.last_name,
                'last_login'  : user.last_login
            }, status=status.HTTP_200_OK)

        except Exception as error:
            logger.exception(error)
            return Response({
                "detail": "In-valid username or password"
            })

