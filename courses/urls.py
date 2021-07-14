from django.urls import path
from .views import *

urlpatterns = [
    path('getcourses/', get_courses),
    path('getlessons/<str:course_title>/',get_lessons),
    path('getlesson/<str:course_title>/<str:lesson_title>/', get_lesson_details),
    path('getlesson/<str:course_title>/<str:lesson_title>/add/',add_time_played)
]
