# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/2/7 14:42'

from django.conf.urls import url
from .views import UserinfoView, UploadImageView, UpdatePwdView, SendEmailCodeView, UpdateEmailView

urlpatterns = [
    url(r'^info/$', UserinfoView.as_view(), name="user_info"),
    url(r'^image/upload/$', UploadImageView.as_view(), name="image_upload"),
    url(r'^update/pwd/$', UpdatePwdView.as_view(), name="update_pwd"),
    url(r'^sendemail_code/$', SendEmailCodeView.as_view(), name="sendemail_code"),
    #修改邮箱
    url(r'^update_email/$', UpdateEmailView.as_view(), name="update_email"),
]
