from django.shortcuts import render
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.http import JsonResponse


# Create your views here.

# incercarea initiala de signup

'''
class SignupView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            password = serializer.data.get('password')
            email = serializer.data.get('email')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            username = email

            queryset = User.objects.filter(username=username)
            if not queryset.exists():
                user = User.objects.create_user(email, email=email, password=password)
                user.last_name = last_name
                user.first_name = first_name
                user.save()
                return Response({'Success': 'User created'}, status=status.HTTP_201_CREATED)
            return Response({'Bad request': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
'''