from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from api.serializers.auth_serializers import (
    SignupSerializer,
    LoginSerializer,
    GoogleSerializer
)

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

import uuid

User = get_user_model()


# 🔐 Token generator
def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


# 🔹 Common response format
def auth_response(message, user, tokens):
    return Response({
        "message": message,
        "access": tokens["access"],
        "refresh": tokens["refresh"],
        "user": {
            "email": user.email,
            "is_guest": user.is_guest
        }
    })


# ✅ 1. SIGNUP
@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(email=email, password=password)

    tokens = get_tokens(user)

    return auth_response("Signup successful", user, tokens)


# ✅ 2. LOGIN
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    user = authenticate(request, email=email, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    tokens = get_tokens(user)

    return auth_response("Login successful", user, tokens)


# ✅ 3. GUEST LOGIN
@api_view(['POST'])
def guest_login(request):
    temp_email = f"guest_{uuid.uuid4()}@temp.com"

    user = User.objects.create(
        email=temp_email,
        is_guest=True
    )
    user.set_unusable_password()
    user.save()

    tokens = get_tokens(user)

    return auth_response("Guest login successful", user, tokens)


# ✅ 4. GOOGLE LOGIN
@api_view(['POST'])
def google_login(request):
    serializer = GoogleSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    token = serializer.validated_data['token']

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request()
        )

        email = idinfo.get('email')

        if not email:
            return Response({"error": "Email not found"}, status=400)

        user, _ = User.objects.get_or_create(email=email)

        tokens = get_tokens(user)

        return auth_response("Google login successful", user, tokens)

    except ValueError:
        return Response({"error": "Invalid Google token"}, status=400)