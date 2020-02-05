# _*_ encoding: utf-8 _*_
from django.shortcuts import render
from django.views import  View
from pure_pagination import Paginator, EmptyPage, PageNotAnInteger

from .models import Team
# Create your views here.


class TeamView(View):

    def get(self, request):
        all_teams = Team.objects.all()
        team_nums = all_teams.count()
        #分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(all_teams, 5, request=request)

        teams = p.page(page)
        return render(request, "team_list.html", {
            "all_teams":teams,
            "team_nums":team_nums,
        })