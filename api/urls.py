from django.urls import path
from django.urls.conf import include
from .serializers import RegisterSerializer
from rest_auth.registration.views import VerifyEmailView,ConfirmEmailView
from rest_auth.views import PasswordResetConfirmView

urlpatterns = [
    path('auth/register/account-confirm-email/<str:key>/',ConfirmEmailView.as_view()),
    #path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
