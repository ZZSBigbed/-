from django.shortcuts import render
from django.views.generic.base import View
from pure_pagination import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse

from operation.models import UserFavorite

from .models import Competition, CompetitionResource
from operation.models import UserFavorite

# Create your views here.


class CompetitionListView(View):
    def get(self, request):
        all_competitions = Competition.objects.all().order_by("-add_time")
        hot_competitions = Competition.objects.all().order_by("-click_nums")[:3]
        sort = request.GET.get('sort', "")
        if sort:
            if sort == "students":
                all_competitions = all_competitions.order_by("-students")
            elif sort == "hot":
                all_competitions = all_competitions.order_by("-click_nums")

        # 分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(all_competitions, 3, request=request)

        competitions = p.page(page)

        return render(request, 'competition-list.html', {
            "all_competitions": competitions,
            "sort": sort,
            "hot_competitions": hot_competitions
        })


class CompetitionDetailView(View):

    def get(self, request, competition_id):
        competition = Competition.objects.get(id=int(competition_id))
        competition.click_nums += 1
        competition.save()

        has_fav_competition = False

        if request.user.is_authenticated:
            if UserFavorite.objects.filter(user=request.user, fav_id=competition.id):
                has_fav_competition = True

        tag = competition.tag
        if tag:
            relate_competitions = Competition.objects.filter(tag=tag)[:1]
        else:
            relate_competitions = []

        all_resources = CompetitionResource.objects.filter(competition=competition)

        return render(request, "competition-detail.html", {
            "competition": competition,
            "relate_competitions": relate_competitions,
            "has_fav_competition": has_fav_competition,
            "competition_resources": all_resources,
        })


class AddFavView(View):

    def post(self, request):
        fav_id = request.POST.get('fav_id', 0)

        if not request.user.is_authenticated:
            # 判断用户登录状态
            return HttpResponse('{"status":"fail", "msg":"用户未登录"}', content_type='application/json')

        exist_records = UserFavorite.objects.filter(user=request.user, fav_id=int(fav_id))
        if exist_records:
            # 如果记录已经存在， 则表示用户取消收藏
            exist_records.delete()
            competition = Competition.objects.get(id=int(fav_id))
            competition.fav_nums -= 1
            if competition.fav_nums < 0:
                competition.fav_nums = 0
            competition.save()
            return HttpResponse('{"status":"success", "msg":"收藏"}', content_type='application/json')
        else:
            user_fav = UserFavorite()
            if int(fav_id) > 0:
                user_fav.user = request.user
                user_fav.fav_id = int(fav_id)
                user_fav.save()
                competition = Competition.objects.get(id=int(fav_id))
                competition.fav_nums += 1
                competition.save()
                return HttpResponse('{"status":"success", "msg":"已收藏"}', content_type='application/json')
            else:
                return HttpResponse('{"status":"fail", "msg":"收藏出错"}', content_type='application/json')
