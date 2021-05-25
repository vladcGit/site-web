from django.shortcuts import render
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import date


# Create your views here.

def signup(request, first_name, last_name, email, password):
    '''
    username = email
    today = date.today()
    queryset = User.objects.filter(username=username)
    if not queryset.exists():
        user = User(username=username, password=password, email=email,
                    first_name=first_name, last_name=last_name, date_joined=today)
        user.save()
        return Response({'Success': 'User created'}, status=status.HTTP_201_CREATED)
    return Response({'Bad request': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    '''
    user = User.objects.create_user(email, email=email, password=password)
    user.last_name = last_name
    user.first_name = first_name
    user.save()

    return Response({'Success': 'User created'}, status=status.HTTP_201_CREATED)


class SignupView(APIView):

    tst = 2
    def get(self, request, first_name, last_name, email, password):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        username = email
        today = date.today()
        queryset = User.objects.filter(username=username)
        if not queryset.exists():
            user = User(username=username, password=password, email=email,
                        first_name=first_name, last_name=last_name, date_joined=today)
            user.save()
            return Response({'Success': 'User created'}, status=status.HTTP_201_CREATED)
        return Response({'Bad request': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
