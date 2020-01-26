# _*_ encoding: utf-8 _*_
from django.shortcuts import render
from django.views import  View
# Create your views here.


class TeamView(View):

    def get(self, request):
        return render(request, "team_list.html", {})