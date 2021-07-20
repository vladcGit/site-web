from django.db.models.expressions import F
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Courses, Lessons
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from json import loads
# Create your views here.


def get_courses(request):
    c = list(Courses.objects.values())
    return JsonResponse(c, safe=False)


def get_lessons(request,course_title):
    c = Courses.objects.get(name=course_title)
    lectii = list(Lessons.objects.filter(course=c).values())
    return JsonResponse(lectii, safe=False)

@csrf_exempt
def get_lesson_details(request, course_title, lesson_title):
    if len(request.body)>0:
        #cod_secret = request.body.decode('utf-8').split(":")[1][1:-2]
        cod_secret = loads(request.body.decode('utf-8'))['cod']
        if(request.method == 'POST' and cod_secret == "220620006969"):
            c = Courses.objects.get(name=course_title)
            lectie = Lessons.objects.filter(course=c, title=lesson_title).values()[0]
            return JsonResponse(lectie, safe=False)
    return JsonResponse({"Error":"Nu aveti acces"})

@csrf_exempt
def add_time_played(request,course_title,lesson_title):
    if len(request.body)>0:
        body = loads(request.body.decode('utf-8'))
        cod_secret = body['cod']
        if(request.method == 'POST' and cod_secret == "220620006969"):
            c = Courses.objects.get(name=course_title)
            lectie = Lessons.objects.filter(course=c, title=lesson_title)[0]
            lectie.time_played += body['time']
            lectie.save()
            return JsonResponse({"Succes":"OK"})
    return JsonResponse({"Error":"Nu aveti acces"})
    
