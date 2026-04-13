# api/urls/authentication.py

from django.urls import path
from api.views.authentication import (
    signup,
    login,
    guest_login,
    google_login
)

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('guest/', guest_login),
    path('google/', google_login),
]