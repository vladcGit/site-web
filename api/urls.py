from django.urls import path
from django.urls.conf import include
from .views import SignupView

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls'))
]
