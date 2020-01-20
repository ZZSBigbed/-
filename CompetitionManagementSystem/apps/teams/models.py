# _*_ encoding: utf-8 _*_
from datetime import datetime

from django.db import models

from competitions.models import Competition

# Create your models here.


class Team(models.Model):
    name = models.CharField(max_length=50, verbose_name=u"团队名称")
    desc = models.TextField(verbose_name=u"团队描述")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"参赛团队"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name