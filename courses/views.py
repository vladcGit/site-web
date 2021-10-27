from datetime import datetime, date
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Courses, Lessons, ViewedLessons
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from json import loads
# Create your views here.


def get_courses(request):
    c = list(Courses.objects.values())
    return JsonResponse(c, safe=False)


def get_lessons(request, course_title):
    # date lectie propriu-zise
    c = Courses.objects.get(name=course_title)
    lectii = list(Lessons.objects.filter(course=c).values())
    for lectie in lectii:
        if 'video' in lectie:
            del lectie['video']
    if request.user.is_authenticated:
        # date despre ultima lectie vizionate
        istoric_vizionare = ViewedLessons.objects.filter(
            user=request.user, curs=c)
        # doar lectii[0] are ultima lectie vizionata din motive de trimis mai putine date
        if istoric_vizionare.exists():
            istoric = list(istoric_vizionare.values())[0]
            lectii[0]['last_viewed'] = istoric['numar_lectie']
            lectii[0]['data_ultima_lectie'] = istoric['data_ultima_lectie']
        else:
            ViewedLessons.objects.create(user=request.user, curs=c)
            lectii[0]['last_viewed'] = 1
            lectii[0]['data_ultima_lectie'] = datetime.now()
    else:
        lectii[0]['last_viewed'] = -1
        lectii[0]['data_ultima_lectie'] = datetime.now()

    return JsonResponse(lectii, safe=False)


# mereu user-ul nu va fi null pentru ca react face redirect la signin
@csrf_exempt
def get_lesson_details(request, course_title, lesson_title):
    flag = True
    if len(request.body) > 0:
        #cod_secret = request.body.decode('utf-8').split(":")[1][1:-2]
        cod_secret = loads(request.body.decode('utf-8'))['cod']
        if(request.method == 'POST' and cod_secret == "220620006969"):
            c = Courses.objects.get(name=course_title)
            lectie = Lessons.objects.filter(
                course=c, title=lesson_title).values()[0]
            if 'video' in lectie:
                del lectie['video']
            istoric_vizionare = ViewedLessons.objects.filter(
                user=request.user, curs=c)
            if istoric_vizionare.exists():
                istoric = list(istoric_vizionare.values())[0]
                # calculez diferenta de zile intre azi si cand a vizionat ultima lectie
                date_format = "%Y-%m-%d"
                data_ultima_lectie = datetime.strptime(
                    str(istoric['data_ultima_lectie']), date_format)
                today = datetime.combine(date.today(), datetime.min.time())
                delta = today - data_ultima_lectie
                # calculez diferenta intre ce acceseaza si ce are voie
                diferenta = int(lectie['title'][0]) - istoric['numar_lectie']
                # daca are acces direct la cursul asta sau e urmatorul si
                # a trecut mai mult de o zi flag ramane True
                if diferenta > 1 or (diferenta == 1 and delta.days < 1):
                    flag = False
            else:
                flag = False
            # linie adaugata pentru beta
            flag = True
            if flag:
                istoric_vizionare = istoric_vizionare[0]
                if diferenta == 1:
                    istoric_vizionare.data_ultima_lectie = datetime.now()
                    istoric_vizionare.numar_lectie = int(lectie['title'][0])
                istoric_vizionare.save()
                return JsonResponse(lectie, safe=False)
    return JsonResponse({"Error": "Nu aveti acces"})


@csrf_exempt
def add_time_played(request, course_title, lesson_title):
    if len(request.body) > 0:
        body = loads(request.body.decode('utf-8'))
        cod_secret = body['cod']
        if(request.method == 'POST' and cod_secret == "220620006969"):
            c = Courses.objects.get(name=course_title)
            lectie = Lessons.objects.filter(course=c, title=lesson_title)[0]
            lectie.time_played += body['time']
            lectie.save()
            return JsonResponse({"Succes": "OK"})
    return JsonResponse({"Error": "Nu aveti acces"})


@csrf_exempt
def get_video_blob(request, course_title, lesson_title):
    flag = True
    if len(request.body) > 0:
        #cod_secret = request.body.decode('utf-8').split(":")[1][1:-2]
        cod_secret = loads(request.body.decode('utf-8'))['cod']
        if(request.method == 'POST' and cod_secret == "220620006969"):
            c = Courses.objects.get(name=course_title)
            lectie = Lessons.objects.filter(
                course=c, title=lesson_title).values()[0]
            istoric_vizionare = ViewedLessons.objects.filter(
                user=request.user, curs=c)
            if istoric_vizionare.exists():
                istoric = list(istoric_vizionare.values())[0]
                # calculez diferenta de zile intre azi si cand a vizionat ultima lectie
                date_format = "%Y-%m-%d"
                data_ultima_lectie = datetime.strptime(
                    str(istoric['data_ultima_lectie']), date_format)
                today = datetime.combine(date.today(), datetime.min.time())
                delta = today - data_ultima_lectie
                # calculez diferenta intre ce acceseaza si ce are voie
                diferenta = int(lectie['title'][0]) - istoric['numar_lectie']
                # daca are acces direct la cursul asta sau e urmatorul si
                # a trecut mai mult de o zi flag ramane True
                if diferenta > 1 or (diferenta == 1 and delta.days < 1):
                    flag = False
            else:
                flag = False
            if flag:
                istoric_vizionare = istoric_vizionare[0]
                if diferenta == 1:
                    istoric_vizionare.data_ultima_lectie = datetime.now()
                    istoric_vizionare.numar_lectie = int(lectie['title'][0])
                istoric_vizionare.save()
                return HttpResponse(lectie['video'], content_type='application/octet-stream')
    return JsonResponse({"Error": "Nu aveti acces"})
