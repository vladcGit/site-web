from django.db import models

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

    def __str__(self):
        return self.title
