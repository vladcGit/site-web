from api.models import CustomUser
from django.db import models

# Create your models here.


class StripeCustomer(models.Model):
    user = models.OneToOneField(to=CustomUser, on_delete=models.CASCADE)
    stripeCustomerId = models.CharField(max_length=255)
    stripeSubscriptionId = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username
