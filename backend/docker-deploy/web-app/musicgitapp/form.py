# forms.py
from django import forms

class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    #email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())
