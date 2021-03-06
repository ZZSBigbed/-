# _*_ encoding: utf-8 _*_
import json, xlwt
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.views.generic.base import View
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect

from .forms import LoginForm, RegisterForm, ForgetForm, ModifyPwdForm, UploadImageForm, UserInfoForm, \
    UploadApplyImageForm, UserApplyForm, AddCompetitionForm
from .models import UserProfile, EmailVerifyRecord, Banner
from operation.models import UserTeam, UserFavorite, UserMessage, UserApply
from competitions.models import Competition
from utils.email_send import send_register_email
from django.contrib.auth.mixins import LoginRequiredMixin
from pure_pagination import Paginator, EmptyPage, PageNotAnInteger


class CustomBackend(ModelBackend):

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserProfile.objects.get(Q(username=username) | Q(email=username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None


class ActiveUserView(View):
    def get(self, request, active_code):
        all_records = EmailVerifyRecord.objects.filter(code=active_code)
        if all_records:
            for record in all_records:
                email = record.email
                user = UserProfile.objects.get(email=email)
                user.is_active = True
                user.save()
        else:
            return render(request, "active_fail.html")
        return render(request, "login.html")


class RegisterView(View):
    def get(self, request):
        register_form = RegisterForm()
        return render(request, "register.html", {"register_form": register_form})

    def post(self, request):
        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user_name = request.POST.get("email", "")
            if UserProfile.objects.filter(email=user_name):
                return render(request, "register.html", {"register_form": register_form, "msg": "该邮箱已被注册！"})

            pass_word = request.POST.get("password", "")
            name = request.POST.get("name", "")
            special_id = request.POST.get("special_id", "")
            stu_college_major = request.POST.get("stu_college_major", "")
            user_profile = UserProfile()
            user_profile.username = user_name
            user_profile.email = user_name
            user_profile.is_active = False
            user_profile.password = make_password(pass_word)
            user_profile.last_name = name[0:1]
            user_profile.first_name = name[1:]
            user_profile.special_id = special_id
            user_profile.stu_college_major = stu_college_major
            user_profile.save()
            # 写入欢迎注册消息
            user_message = UserMessage()
            user_message.user = user_profile.id
            user_message.message = "欢迎注册科创竞赛管理系统!"
            user_message.save()

            send_register_email(user_name, "register")
            return render(request, "login.html")
        else:
            return render(request, "register.html", {"register_form": register_form})


class LogoutView(View):
    """
    用户登出
    """

    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse("index"))


class LoginView(View):

    def get(self, request):
        return render(request, "login.html", {})

    def post(self, request):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            user_name = request.POST.get("username", "")
            pass_word = request.POST.get("password", "")
            user = authenticate(username=user_name, password=pass_word)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    if user.is_teacher:
                        return HttpResponseRedirect(reverse("teacher_index"))
                    return HttpResponseRedirect(reverse("index"))
                else:
                    return render(request, "login.html", {"msg": "用户未激活！"})
            else:
                return render(request, "login.html", {"msg": "用户名或密码错误！"})
        else:
            return render(request, "login.html", {"login_form": login_form})


class ForgetPwdView(View):

    def get(self, request):
        forget_form = ForgetForm()
        return render(request, "forgetpwd.html", {"forget_form": forget_form})

    def post(self, request):
        forget_form = ForgetForm(request.POST)
        if forget_form.is_valid():
            email = request.POST.get("email", "")
            send_register_email(email, "forget")
            return render(request, "send_success.html")
        else:
            return render(request, "forgetpwd.html", {"forget_form": forget_form})


class ResetView(View):
    def get(self, request, active_code):
        all_records = EmailVerifyRecord.objects.filter(code=active_code)
        if all_records:
            for record in all_records:
                email = record.email
                return render(request, "password_reset.html", {"email": email})
        else:
            return render(request, "active_fail.html")
        return render(request, "login.html")


class ModifyPwdView(View):

    def post(self, request):
        modify_form = ModifyPwdForm(request.POST)
        if modify_form.is_valid():
            pwd1 = request.POST.get("password1", "")
            pwd2 = request.POST.get("password2", "")
            email = request.POST.get("email", "")
            if pwd1 != pwd2:
                return render(request, "password_reset.html", {"email": email, "msg": "密码不一致！"})
            user = UserProfile.objects.get(email=email)
            user.password = make_password(pwd2)
            user.save()
            return render(request, "login.html")
        else:
            email = request.POST.get("email", "")
            return render(request, "password_reset.html", {"email": email, "modify_form": modify_form})


class UserinfoView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'usercenter-info.html', {})

    def post(self, request):
        user_info_form = UserInfoForm(request.POST, instance=request.user)
        if user_info_form.is_valid():
            user_info_form.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse(json.dumps(user_info_form.errors), content_type='application/json')


class UserApplylistView(LoginRequiredMixin, View):

    def get(self, request):
        UserApply.objects.filter(competition_name="请添加").delete()
        all_user_apply = UserApply.objects.filter(user=request.user)
        return render(request, 'usercenter-applylist.html', {
            "all_user_apply": all_user_apply,
        })


class NewApplyView(LoginRequiredMixin, View):

    def get(self, request):
        user_apply = UserApply(user=request.user)
        user_apply.competition_name = "请添加"
        user_apply.save()
        return HttpResponseRedirect("{0}".format(user_apply.id))


class ApplyDetailView(LoginRequiredMixin, View):

    def get(self, request, apply_id):
        user_apply = UserApply.objects.get(id=int(apply_id))

        return render(request, "apply-detail.html", {
            "user_apply": user_apply,
        })

    def post(self, request, apply_id):
        user_apply_form = UserApplyForm(request.POST)
        if user_apply_form.is_valid():
            user_apply = UserApply.objects.get(id=int(apply_id))
            user_apply.competition_name = user_apply_form.cleaned_data['competition_name']
            user_apply.level = user_apply_form.cleaned_data['level']
            user_apply.rank = user_apply_form.cleaned_data['rank']
            user_apply.save()
            return HttpResponseRedirect("/user/myapply/")
        else:
            return HttpResponse(json.dumps(user_apply_form.errors), content_type='application/json')


class ApplyCertifyView(LoginRequiredMixin, View):

    def get(self, request, apply_id):
        user_apply = UserApply.objects.get(id=int(apply_id))
        return render(request, "apply-certify.html", {
            "user_apply": user_apply,
        })

    def post(self, request, apply_id):
        user_apply = UserApply.objects.get(id=int(apply_id))

        if not user_apply.is_certified:
            user_apply.is_certified = True
        else:
            user_apply.is_certified = False
        user_apply.save()
        return HttpResponseRedirect("/user/certifylist/")


class CertifyView(LoginRequiredMixin, View):

    def get(self, request):
        uncertified_user_apply = UserApply.objects.filter(is_certified=False)
        certified_user_apply = UserApply.objects.filter(is_certified=True)
        return render(request, 'usercenter-certify.html', {
            "uncertified_user_apply": uncertified_user_apply,
            "certified_user_apply": certified_user_apply,
        })


class UploadImageView(LoginRequiredMixin, View):
    """
    用户修改头像
    """

    def post(self, request):
        image_form = UploadImageForm(request.POST, request.FILES)
        if image_form.is_valid():
            image = image_form.cleaned_data['image']
            request.user.image = image
            request.user.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse('{"status":"fail"}', content_type='application/json')


class ApplyImageView(LoginRequiredMixin, View):
    def post(self, request):
        image_form = UploadApplyImageForm(request.POST, request.FILES)
        if image_form.is_valid():
            image = image_form.cleaned_data['image']
            request.user.image = image
            request.user.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse('{"status":"fail"}', content_type='application/json')


class UpdatePwdView(View):

    def post(self, request):
        modify_form = ModifyPwdForm(request.POST)
        if modify_form.is_valid():
            pwd1 = request.POST.get("password1", "")
            pwd2 = request.POST.get("password2", "")
            if pwd1 != pwd2:
                return HttpResponse('{"status":"fail","msg":"密码不一致"}', content_type='application/json')
            user = request.user
            user.password = make_password(pwd2)
            user.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse(json.dumps(modify_form.errors), content_type='application/json')


class SendEmailCodeView(LoginRequiredMixin, View):
    """
    发送邮箱验证码
    """

    def get(self, request):
        email = request.GET.get('email', '')

        if UserProfile.objects.filter(email=email):
            return HttpResponse('{"email":"邮箱已经存在"}', content_type='application/json')
        send_register_email(email, "update_email")

        return HttpResponse('{"status":"success"}', content_type='application/json')


class UpdateEmailView(LoginRequiredMixin, View):
    def post(self, request):
        email = request.POST.get('email', '')
        code = request.POST.get('code', '')

        existed_records = EmailVerifyRecord.objects.filter(email=email, code=code, send_type='update_email')
        if existed_records:
            user = request.user
            user.email = email
            user.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse('{"email":"验证码出错"}', content_type='application/json')


class MyCompetitionView(LoginRequiredMixin, View):
    def get(self, request):
        user_teams = UserTeam.objects.filter(students=request.user)
        return render(request, 'usercenter-mycompetition.html', {
            "user_teams": user_teams
        })


class AddCompetitionView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'usercenter-addcompetition.html', {})

    def post(self, request):
        competition_form = AddCompetitionForm(request.POST)
        if competition_form.is_valid():
            competition_form.save()
            return HttpResponse('{"status":"success"}', content_type='application/json')
        else:
            return HttpResponse(json.dumps(competition_form.errors), content_type='application/json')


class MyFavView(LoginRequiredMixin, View):
    def get(self, request):
        competition_list = []
        user_favs = UserFavorite.objects.filter(user=request.user)
        for user_fav in user_favs:
            competition_id = user_fav.fav_id
            competition = Competition.objects.get(id=competition_id)
            competition_list.append(competition)
        return render(request, 'usercenter-fav.html', {
            "competition_list": competition_list
        })


class MymessageView(LoginRequiredMixin, View):
    def get(self, request):
        all_messages = UserMessage.objects.filter(user=request.user.id)
        all_unread_messages = UserMessage.objects.filter(has_read=False, user=request.user.id)
        for unread_message in all_unread_messages:
            unread_message.has_read = True
            unread_message.save()
        # 分页
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(all_messages, 5, request=request)

        messages = p.page(page)
        return render(request, 'usercenter-message.html', {
            "messages": messages
        })


class IndexView(View):
    def get(self, request):
        all_banners = Banner.objects.all().order_by('index')
        competitions = Competition.objects.filter(is_banner=False)[:6]
        banner_competitions = Competition.objects.filter(is_banner=True)[:3]
        top100_students = []
        user_index = 0
        grade = ""
        college_major = ""
        if request.user.is_authenticated:
            if request.user.is_teacher:
                all_students = UserProfile.objects.filter(is_teacher=False)

                # 取出筛选学院专业
                grade = request.GET.get('grade', "")
                if grade:
                    all_students = all_students.filter(Q(special_id__contains=grade))
                # 学院专业筛选
                college_major = request.GET.get('cm', "")
                if college_major:
                    all_students = all_students.filter(stu_college_major=college_major)

                all_students = all_students.order_by("-score")
            else:
                all_students = UserProfile.objects.filter(stu_college_major=request.user.stu_college_major)
                all_students = all_students.order_by("-score")
                user_index = 0
                for student in all_students:
                    user_index += 1
                    if student.special_id == request.user.special_id:
                        break
            top100_students = all_students.all()[:100]
        return render(request, 'index.html', {
            'all_banners': all_banners,
            'competitions': competitions,
            'banner_competitions': banner_competitions,
            "top100_students": top100_students,
            "user_index": user_index,
            "college_major": college_major,
            "grade": grade
        })


def output(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="users.xls"'
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Users')
    # Sheet header, first row
    row_num = 0
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    columns = ['用户名', '姓', '名', '学号', '电子邮箱', '积分']
    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)
    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    all_students = UserProfile.objects.filter(is_teacher=False)
    # 取出筛选学院专业
    grade = request.GET.get('grade', "")
    if grade:
        all_students = all_students.filter(Q(special_id__contains=grade))
    # 学院专业筛选
    college_major = request.GET.get('cm', "")
    if college_major:
        all_students = all_students.filter(stu_college_major=college_major)

    all_students = all_students.order_by("-score")
    rows = all_students.values_list('username', 'last_name', 'first_name', 'special_id', 'email', 'score')
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)
    wb.save(response)
    return response


def page_not_found(request, exception):
    return render(request, '404.html')


def page_error(request):
    return render(request, '500.html')
