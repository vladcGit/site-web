from django.urls import path
from .views import *

urlpatterns = [
    path('getcourses/', get_courses),
    path('getlesson/<str:course_title>/<str:lesson_title>/', get_lesson_details),
]
