# Generated by Django 3.2.3 on 2021-07-25 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='had_trial',
            field=models.BooleanField(default=False),
        ),
    ]