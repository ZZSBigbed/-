# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/2/5 10:32'
from django.conf.urls import url
from .views import CompetitionListView, CompetitionDetailView, AddFavView


urlpatterns = [
    url(r'^list/$', CompetitionListView.as_view(), name="competition_list"),
    url(r'^detail/(?P<competition_id>\d+)/$', CompetitionDetailView.as_view(), name="competition_detail"),
    url(r'^add_fav/$', AddFavView.as_view(), name="add_fav"),
]