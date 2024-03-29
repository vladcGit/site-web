"""
Django settings for site_web project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-v-_ahcxoka6tvs=e!ej@1p&9lki_ztu+99s=6@)4=_i&&q71q5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['192.168.1.15', '192.168.1.5', '127.0.0.1', '192.168.0.102',
                 '192.168.100.28', 'vladconst.pythonanywhere.com', '192.168.1.15',
                 '192.168.56.1', '*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'frontend.apps.FrontendConfig',
    'rest_framework.authtoken',  # new
    'rest_auth',  # new
    'django.contrib.sites',  # new
    'allauth',  # new
    'allauth.account',  # new
    'allauth.socialaccount',  # new
    'rest_auth.registration',  # new
    'corsheaders',  # new
    'django_rest_passwordreset',

    'api',
    'subscriptions.apps.SubscriptionsConfig',
    'courses',

    'sslserver',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'site_web.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'site_web.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Bucharest'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITE_NAME = 'https://127.0.0.1:8000'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = "/home/vladconst/site-web/static"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'api.CustomUser'

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'api.serializers.RegisterSerializer',
}


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True

# mandatory daca vreau sa fie obligatorie confirmarea
ACCOUNT_EMAIL_VERIFICATION = 'none'
LOGIN_URL = SITE_NAME+'/signin'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# mail trimis pe bune
'''
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'icaracademyro@gmail.com'
EMAIL_HOST_PASSWORD = 'sfantulsava58'
'''

REST_FRAMEWORK = {
    'DATETIME_FORMAT': "%m/%d/%Y %I:%M%P",
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}


STRIPE_PUBLISHABLE_KEY = 'pk_test_51IxFpNG3BrIJ6aWB49fVDuCu6JvnlLcCYz81cfS1KQ178aIrDRjHHAM0tvrVLN9RwbHlg9PxxlaQkYbgfVFZHKie00VNyfzXPW'

STRIPE_SECRET_KEY = 'sk_test_51IxFpNG3BrIJ6aWBDqn3SbjMcMNaVNbMFMyHdfP0QGGPRzlxby0DS7o6JUc2SMf22DnKxhAyobVaq4WuClwIzNDt00sEI9ZbUR'

STRIPE_PRICE_ID = 'price_1IxFu2G3BrIJ6aWBH5Bch0wk'

STRIPE_TRIAL_PRICE = 'price_1JCVfHG3BrIJ6aWBgtvhhEFn'

STRIPE_ENDPOINT_SECRET = 'whsec_BzAiRlqXiumckbS3X0L3vzLLJUlFxNBB'
