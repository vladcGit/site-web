import stripe
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse


# Create your views here.


def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)

# aici ar putea fi pus un @login_required dar
# cand am incercat am primit erori ca nu exista un anumit url


def create_checkout_session(request):
    if request.method == 'GET':
        # varianta care nu e hardcoded poate da erori la
        # create checkout session
        domain_url = 'http://' + request.META['HTTP_HOST'] + '/'
        #domain_url = 'http://127.0.0.1:8000/'
        print(domain_url)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            checkout_session = stripe.checkout.Session.create(
                client_reference_id=request.user.id if request.user.is_authenticated else None,
                success_url=domain_url,
                cancel_url=domain_url + 'cancel/',
                payment_method_types=['card'],
                mode='subscription',
                line_items=[
                    {
                        'price': settings.STRIPE_PRICE_ID,
                        'quantity': 1,
                    }
                ]
            )
            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})
