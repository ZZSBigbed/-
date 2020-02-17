# _*_ encoding: utf-8 _*_
from datetime import datetime

from django.db import models


# Create your models here.


class Competition(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"竞赛名")
    desc = models.CharField(max_length=300, verbose_name=u"竞赛描述")
    category = models.CharField(max_length=20, verbose_name=u"课程类别", default=u"科创竞赛")
    detail = models.TextField(verbose_name=u"竞赛详情")
    level = models.CharField(
        choices=(("nation", u"国家级"), ("province", u"省级"), ("city", u"市级"), ("school", u"校级"), ("college", u"院级")),
        max_length=10, verbose_name=u'等級')
    tag = models.CharField(default="", verbose_name=u"课程标签", max_length=20)
    start_date = models.DateField(verbose_name=u"开始日期")
    end_date = models.DateField(verbose_name=u"结束日期")
    students = models.IntegerField(default=0, verbose_name=u"参加人数")
    fav_nums = models.IntegerField(default=0, verbose_name=u"收藏人数")
    click_nums = models.IntegerField(default=0, verbose_name=u"点击数")
    is_banner = models.BooleanField(default=False, verbose_name=u"是否轮播")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"竞赛"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class CompetitionResource(models.Model):
    competition = models.ForeignKey(Competition, verbose_name=u"竞赛", on_delete=models.CASCADE)
    name = models.CharField(max_length=100, verbose_name=u"名称")
    download = models.FileField(upload_to="media/competitions/resource/%Y/%m", verbose_name=u"文件", max_length=100)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"竞赛资源"
        verbose_name_plural = verbose_name
