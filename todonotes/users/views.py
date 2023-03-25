from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerFull


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerFull
        return UserModelSerializer
