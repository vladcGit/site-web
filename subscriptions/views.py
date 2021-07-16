import stripe
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse, HttpResponse
from .models import CustomUser, StripeCustomer
from json import loads


# Create your views here.


def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)

# aici ar putea fi pus un @login_required dar
# cand am incercat am primit erori ca nu exista un anumit url


def create_checkout_session(request,price_id):
    if request.method == 'GET':
        # varianta care nu e hardcoded poate da erori la
        # create checkout session
        domain_url = 'https://' + request.META['HTTP_HOST'] + '/'
        #domain_url = 'https://127.0.0.1:8000/'
        print(domain_url)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            args = {
                'client_reference_id':request.user.id if request.user.is_authenticated else None,
                'success_url':domain_url+'myaccount',
                'cancel_url':domain_url + 'cancel',
                'payment_method_types':['card'],
                'mode':'subscription',
                'line_items':[
                    {
                        'price': price_id,
                        'quantity': 1,
                    }
                ]
            }

            if(price_id == settings.STRIPE_TRIAL_PRICE):
                 args["subscription_data"] = {'trial_period_days': 7}

            checkout_session = stripe.checkout.Session.create(**args)
            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})


@csrf_exempt
def stripe_webhook(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    endpoint_secret = settings.STRIPE_ENDPOINT_SECRET
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # Fetch all the required data from session
        client_reference_id = session.get('client_reference_id')
        stripe_customer_id = session.get('customer')
        stripe_subscription_id = session.get('subscription')

        # Get the user and create a new StripeCustomer
        user = CustomUser.objects.get(id=client_reference_id)
        StripeCustomer.objects.create(
            user=user,
            stripeCustomerId=stripe_customer_id,
            stripeSubscriptionId=stripe_subscription_id,
        )
        print(user.username + ' just subscribed.')

    return HttpResponse(status=200)


# varianta in care sunt mai multe tipuri de abonari
# @login_required(login_url='https://127.0.0.1:8000/signin/')
def get_subscription_details_multiple_subscriptions(request):
    try:
        # Retrieve the subscription & product
        stripe_customer = StripeCustomer.objects.get(user=request.user)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        subscription = stripe.Subscription.retrieve(
            stripe_customer.stripeSubscriptionId)
        product = stripe.Product.retrieve(subscription.plan.product)

        return JsonResponse({
            'subscription': subscription,
            'product': product, })
    except StripeCustomer.DoesNotExist:
        return JsonResponse({'Error': 'Customer does not exist'})


# @login_required
def get_subscription_details(request):
    if StripeCustomer.objects.filter(user=request.user).exists():
        return JsonResponse({'subscription': 'active', })
    else:
        return JsonResponse({'Error': 'Customer does not exist'})

def cancel_subscription(request):
    if request.method == 'GET' and request.user.is_authenticated:
        stripe.api_key = settings.STRIPE_SECRET_KEY
        user = CustomUser.objects.get(id=request.user.id)
        client = StripeCustomer.objects.get(user=user)
        stripe.Subscription.delete(client.stripeSubscriptionId)
        client.delete()
        return JsonResponse({'Succes':'OK'});
    return JsonResponse({'Error':'Bad Request'});


