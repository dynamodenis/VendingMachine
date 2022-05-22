from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,username,email,password):
        if username is None:
            raise TypeError("Users Must Have Usernames")
        if email is None:
            raise TypeError('Users Must Have Email Adresses')
        
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    
    # create a super user
    def create_superuser(self,username,email,password):
        if password is None:
            raise TypeError('Superusers must have password')
        
        user = self.create_user(username,email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        

        
        
class User(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=300)
    email = models.EmailField(max_length=300,unique=True)
    is_active=models.BooleanField(default=True)
    is_staff =models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD ="email"
    REQUIRED_FIELDS=[]
    
    objects = UserManager()
    
    def __str__(self):
        return self.username
    