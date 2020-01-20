# _*_ encoding: utf-8 _*_
from datetime import datetime

from django.db import models

# Create your models here.


class Competition(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"竞赛名")
    desc = models.CharField(max_length=300, verbose_name=u"竞赛描述")
    detail = models.TextField(verbose_name=u"竞赛详情")
    level = models.CharField(choices=(("nation",u"国家级"),("province",u"省级"),("city",u"市级"),("school",u"校级"),("college",u"院级")), max_length=10, verbose_name=u'等級')
    start_date = models.DateField(verbose_name=u"开始日期")
    end_date = models.DateField(verbose_name=u"结束日期")
    students = models.IntegerField(default=0, verbose_name=u"参加人数")
    fav_nums = models.IntegerField(default=0, verbose_name=u"收藏人数")
    image = models.ImageField(upload_to="competitions/%Y/%m", verbose_name=u"封面图", max_length=100)
    click_nums = models.IntegerField(default=0, verbose_name=u"点击数")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"竞赛"
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.name

class CompetitionResource(models.Model):
    competition = models.ForeignKey(Competition, verbose_name=u"竞赛", on_delete=models.CASCADE)
    name = models.CharField(max_length=100, verbose_name=u"名称")
    download = models.FileField(upload_to="competitions/resource/%Y/%m", verbose_name=u"文件", max_length=100)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"竞赛资源"
        verbose_name_plural = verbose_name
