# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/2/2 11:49'
from django.conf.urls import url, include

from .views import TeamView

urlpatterns = [
    url(r'^list/$', TeamView.as_view(), name="team_list"),
]