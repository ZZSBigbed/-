# _*_ encoding: utf-8 _*_
from datetime import datetime

from django.db import models


from competitions.models import Competition
from users.models import UserProfile
from teams.models import Team


# Create your models here.


class CompetitionComments(models.Model):
    user = models.ForeignKey(UserProfile, verbose_name=u"用户", on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, verbose_name=u"竞赛", on_delete=models.CASCADE)
    comments = models.CharField(max_length=200, verbose_name=u"评论")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"竞赛评论"
        verbose_name_plural = verbose_name


class UserFavorite(models.Model):
    user = models.ForeignKey(UserProfile, verbose_name=u"用户", on_delete=models.CASCADE)
    fav_id = models.IntegerField(default=0, verbose_name=u"数据id")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"用户收藏"
        verbose_name_plural = verbose_name


class UserMessage(models.Model):
    user = models.IntegerField(default=0, verbose_name=u"接受用户")
    message = models.CharField(max_length=500, verbose_name=u"消息内容")
    has_read = models.BooleanField(default=False, verbose_name=u"是否已读")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"用户消息"
        verbose_name_plural = verbose_name


class UserCompetition(models.Model):
    user = models.ForeignKey(UserProfile, verbose_name=u"用户", on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, verbose_name=u"竞赛", on_delete=models.CASCADE)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"用户竞赛"
        verbose_name_plural = verbose_name


class UserApply(models.Model):
    user = models.ForeignKey(UserProfile, verbose_name=u"用户", on_delete=models.CASCADE)
    competition_name = models.CharField(max_length=50, verbose_name=u"竞赛名")
    level = models.CharField(
        choices=(("nation", u"国家级"), ("province", u"省级"), ("city", u"市级"), ("school", u"校级"), ("college", u"院级")),
        max_length=10, verbose_name=u'等級')
    rank = models.CharField(default="uncertain",
                            choices=(("uncertain", u"未确定"), ("first", u"一等奖"), ("second", u"二等奖"), ("third", u"三等奖")),
                            max_length=10)
    apply_image = models.ImageField(upload_to="media/image/%Y/%m", default=u"media/image/default.png", max_length=100, verbose_name=u"头像")
    is_certified = models.BooleanField(default=False, verbose_name=u"是否被认证")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")


class UserTeam(models.Model):
    team = models.ForeignKey(Team, verbose_name=u"团队", on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, verbose_name=u"竞赛", on_delete=models.CASCADE)
    rank = models.CharField(default="uncertain",
                            choices=(("uncertain", u"未确定"), ("first", u"一等奖"), ("second", u"二等奖"), ("third", u"三等奖")),
                            max_length=10)
    students = models.ManyToManyField(UserProfile, verbose_name=u"队员")
    teacher = models.IntegerField(default=0, verbose_name=u"指导教师")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"用户团队"
        verbose_name_plural = verbose_name
