# Generated by Django 3.2.3 on 2021-10-26 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_lessons_video'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lessons',
            name='video',
        ),
    ]