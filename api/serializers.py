from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password',
                  'first_name', 'last_name')
