from django.urls import path
from django.urls.conf import include
from .views import *

urlpatterns = [
    path('config/', stripe_config),
    path('create-checkout-session/', create_checkout_session),
    path('webhook/', stripe_webhook),
    path('get_subscription_details/', get_subscription_details),
    path('get_full_subscription_details/',
         get_subscription_details_multiple_subscriptions),
]
