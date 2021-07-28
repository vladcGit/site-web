from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail 
from django.conf import settings

from django.contrib.sites.models import Site

# Create your models here.

# modelul e exact ca user-ul basic din django
# probabil va trebui sa schimb daca am nevoie de alte campuri

class CustomUser(AbstractUser):
    had_trial = models.BooleanField(default=False, null=False)
    def __str__(self):
        return self.email


 #trimitere mail de resetare parola

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    email_plaintext_message = settings.SITE_NAME+"/new_password/{}".format(reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Icar Academy"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )

    print(Site.objects.get_current().domain)