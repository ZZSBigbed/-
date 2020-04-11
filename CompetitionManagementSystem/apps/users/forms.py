# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/1/21 11:25'
from django import forms
from captcha.fields import CaptchaField
from .models import UserProfile
from operation.models import UserApply
from competitions.models import Competition


class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, min_length=6)


class RegisterForm(forms.Form):
    name = forms.CharField(required=True)
    special_id = forms.CharField(required=True, max_length=9)
    stu_college_major = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    password = forms.CharField(required=True, min_length=6)
    captcha = CaptchaField(error_messages={"invalid":u"验证码错误"})


class ForgetForm(forms.Form):
    email = forms.EmailField(required=True)
    captcha = CaptchaField(error_messages={"invalid":u"验证码错误"})


class ModifyPwdForm(forms.Form):
    password1 = forms.CharField(required=True, min_length=6)
    password2 = forms.CharField(required=True, min_length=6)


class UploadImageForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['image']

class UploadApplyImageForm(forms.ModelForm):
    class Meta:
        model = UserApply
        fields = ['apply_image']


class UserInfoForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['username', 'gender', 'birthday', 'address', 'mobile']


class UserApplyForm(forms.ModelForm):
    class Meta:
        model = UserApply
        fields = ['competition_name', 'level', 'rank']


class AddCompetitionForm(forms.ModelForm):
    class Meta:
        model = Competition
        fields = ['name', 'desc', 'category', 'detail', 'level', 'start_date', 'end_date', 'admitted_students']