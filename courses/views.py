from django.db.models.expressions import F
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Courses, Lessons
from django.http import JsonResponse
# Create your views here.


def get_courses(request):
    c = list(Courses.objects.values())
    return JsonResponse(c, safe=False)


def get_lessons(request,course_title):
    c = Courses.objects.get(name=course_title)
    lectii = list(Lessons.objects.filter(course=c).values())
    return JsonResponse(lectii, safe=False)


def get_lesson_details(request, course_title, lesson_title):
    c = Courses.objects.get(name=course_title)
    lectie = Lessons.objects.filter(course=c, title=lesson_title).values()[0]
    return JsonResponse(lectie, safe=False)
