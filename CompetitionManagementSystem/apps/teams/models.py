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

    def get_competition(self):
        from operation.models import UserTeam
        user_team = UserTeam.objects.get(team__name=self.name)
        competiton_name = user_team.competition.name
        return competiton_name

    def get_teacher(self):
        from operation.models import UserTeam
        from users.models import UserProfile
        user_team = UserTeam.objects.get(team__name=self.name)
        teacher = UserProfile.objects.get(special_id=user_team.teacher)
        teacher_name = teacher.last_name+teacher.first_name
        return teacher_name

    def get_students(self):
        from operation.models import UserTeam
        from users.models import UserProfile
        user_team = UserTeam.objects.get(team__name=self.name)
        students = user_team.students.all()
        return students
