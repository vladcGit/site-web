from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signup', index),
    path('signin', index),
    path('pricing', index),
    path('myaccount', index),
    path('cancel', index),
    path('courses', index),
    path('courses/<str:course>/<str:lesson>', index),
    path('courses/<str:course>', index),
    path('about-us', index),
    path('reset_password',index),
    path('new_password/<str:token>',index),
    path('reset_successful',index),
    path('unsubscribe',index),
]
