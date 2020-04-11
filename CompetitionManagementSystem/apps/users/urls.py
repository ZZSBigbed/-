# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/2/7 14:42'

from django.conf.urls import url
from .views import UserinfoView, UploadImageView, UpdatePwdView, SendEmailCodeView, UpdateEmailView, MyCompetitionView, \
    MyFavView, MymessageView, UserApplylistView, ApplyDetailView, NewApplyView, CertifyView, ApplyCertifyView, \
    AddCompetitionView, output

urlpatterns = [
    url(r'^info/$', UserinfoView.as_view(), name="user_info"),
    url(r'^image/upload/$', UploadImageView.as_view(), name="image_upload"),
    url(r'^applyimage/upload/$', UploadImageView.as_view(), name="applyimage_upload"),
    url(r'^update/pwd/$', UpdatePwdView.as_view(), name="update_pwd"),
    url(r'^sendemail_code/$', SendEmailCodeView.as_view(), name="sendemail_code"),
    # 修改邮箱
    url(r'^update_email/$', UpdateEmailView.as_view(), name="update_email"),
    url(r'^mycompetition/$', MyCompetitionView.as_view(), name="mycompetition"),
    url(r'^myfav/$', MyFavView.as_view(), name="myfav"),
    url(r'^mymessage/$', MymessageView.as_view(), name="mymessage"),

    url(r'^myapply/$', UserApplylistView.as_view(), name="myapply"),
    url(r'^detail/$', NewApplyView.as_view(), name="newapply"),
    url(r'^add_competition/$', AddCompetitionView.as_view(), name="add_competition"),
    url(r'^detail/(?P<apply_id>\d+)/$', ApplyDetailView.as_view(), name="apply_detail"),
    url(r'^certify/(?P<apply_id>\d+)/$', ApplyCertifyView.as_view(), name="apply_certify"),
    url(r'^certifylist/$', CertifyView.as_view(), name="certifylist"),
    url(r'^output/$',output, name="output"),
]
