from django.urls import path
from django.urls.conf import include
from .views import *

urlpatterns = [
    path('config/', stripe_config),
    path('create-checkout-session/', create_checkout_session),
]
