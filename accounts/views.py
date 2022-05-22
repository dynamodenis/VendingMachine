from django.shortcuts import render
from rest_framework import permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from django.contrib.auth.models import User

# knox login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

#Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) 
        
        user = serializer.save()
        return Response({
            'user':UserSerializer(user,context=self.get_serializer_context()).data,
            'token':AuthToken.objects.create(user)[1]
        })
        

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user':UserSerializer(user,context=self.get_serializer_context()).data,
            'token':AuthToken.objects.create(user)[1]
        })

# class LoginView(KnoxLoginView):
    # serializer_class = LoginSerializer
    # permission_classes = (permissions.AllowAny,)
    
    # def post(self, request, *args, **kwargs):
    #     serializer = LoginSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     user = serializer.validated_data['user']
    #     login(request,user)
    #     return super(LoginView, self).post(request,format=None)

# Get logged in user
class UserAPI(generics.RetrieveAPIView):
    permission_classes =[
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
    