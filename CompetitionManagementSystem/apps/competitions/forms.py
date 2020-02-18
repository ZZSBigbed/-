# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/2/18 17:27'
from django import forms


class SignupForm(forms.Form):
    name = forms.CharField(required=True)
    students = forms.CharField(required=True)
    teacher = forms.CharField(required=True)