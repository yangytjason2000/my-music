
import requests
import os
from django.conf import settings
from urllib.parse import urlencode
import requests
from django.http import HttpResponseRedirect, HttpResponse
from django.core.cache import cache

class DisableCSRFMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        response = self.get_response(request)
        return response



class CheckCookieMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("middleware cookie check:",request.COOKIES)
        response = self.get_response(request)
        return response