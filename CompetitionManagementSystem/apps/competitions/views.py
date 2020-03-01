from django.shortcuts import render
from django.views.generic.base import View
from pure_pagination import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.db.models import Q

from operation.models import UserFavorite

from .models import Competition, CompetitionResource
from operation.models import UserFavorite
from .forms import SignupForm


# Create your views here.


class CompetitionListView(View):
    def get(self, request):
        all_competitions = Competition.objects.all().order_by("-add_time")
        hot_competitions = Competition.objects.all().order_by("-click_nums")[:3]
        #课程搜索
        search_keywords = request.GET.get('keywords', "")
        if search_keywords:
            all_competitions = all_competitions.filter(Q(name__icontains=search_keywords)|Q(desc__icontains=search_keywords)|Q(detail__icontains=search_keywords))

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


class CompetitionSignupView(View):
    def get(self, request, competition_id):
        competition = Competition.objects.get(id=int(competition_id))
        return render(request, "competition-signup.html", {
            "competition": competition
        })

    def post(self, request, competition_id):
        from teams.models import Team
        from operation.models import UserTeam
        from users.models import UserProfile
        signup_form = SignupForm(request.POST)
        competition = Competition.objects.get(id=int(competition_id))
        if signup_form.is_valid():
            team = Team()
            team.name = request.POST.get("name", "")
            try:
                if Team.objects.get(name=team.name):
                    return HttpResponse('{"status":"fail", "msg":"已有队名！"}', content_type='application/json')
            except:
                pass
            team.save()
            user_team = UserTeam()
            user_team.team = team
            user_team.competition = Competition.objects.get(id=int(competition_id))
            students_str = request.POST.get("students", "")
            student_strs = students_str.split(',')
            user_team.save()
            for student_str in student_strs:
                student = UserProfile.objects.get(special_id=student_str)
                if student:
                    user_team.students.add(student)
            teacher_id = request.POST.get("teacher", "")
            user_team.teacher = UserProfile.objects.get(special_id=teacher_id).special_id
            if user_team.teacher:
                user_team.save()
            else:
                return HttpResponse('{"status":"fail", "msg":"未找到该老师！"}', content_type='application/json')
            return render(request, 'signup-success.html', {})
        else:
            return render(request, 'competition-signup.html', {
                "competition": competition,
                "signup_form": signup_form
            })