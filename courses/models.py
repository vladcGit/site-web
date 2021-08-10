from api.models import CustomUser
from django.db import models
from datetime import datetime

# Create your models here.


class Courses(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False)
    description = models.CharField(max_length=400, null=True)
    subject = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Lessons(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False)
    link = models.CharField(max_length=100, null=False)
    details = models.CharField(max_length=400, null=True)
    time_played = models.FloatField(default=0,null=False)
    video=models.BinaryField(max_length=None,null=True)

    def __str__(self):
        return self.title

class ViewedLessons(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    curs = models.ForeignKey(Courses, on_delete=models.CASCADE)
    numar_lectie = models.IntegerField(default=1,null=False)
    data_ultima_lectie = models.DateField(default=datetime.now, null=False)

    def __str__(self):
        return self.user.email + " - " + self.curs.name
