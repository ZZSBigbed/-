# _*_ encoding: utf-8 _*_
from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class UserProfile(AbstractUser):
    birthday = models.DateField(verbose_name=u"生日", null=True, blank=True)
    gender = models.CharField(max_length=6, choices=(("male",u"男"),("female",u"女")), default="female", verbose_name=u"性别")
    address = models.CharField(max_length=100, default=u"", verbose_name=u"地址")
    mobile = models.CharField(max_length=11, default=u"", verbose_name=u"移动电话")
    image = models.ImageField(upload_to="media/image/%Y/%m", default=u"media/image/default.png", max_length=100, verbose_name=u"头像")
    special_id = models.CharField(max_length=9, default=u"", verbose_name=u"学号")
    stu_college_major = models.CharField(max_length=20, default=u"rjxyrjgc",choices=(("rjxyrjgc",u"软件学院 软件工程"),("rjxywlaq",u"软件学院 网络安全"),("gjxxyrjxy",u"国际信息与软件学院"),("wdzxy",u"微电子学院")), null=True, blank=True, verbose_name=u"学院专业")
    teacher_title = models.CharField(max_length=10, default=u"", null=True, blank=True, verbose_name=u"职称")
    score = models.IntegerField(default=0, verbose_name=u"积分")
    class Meta:
        verbose_name = u"用户信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return '{0}'.format(self.username)

    def get_unread_nums(self):
        from operation.models import UserMessage
        return UserMessage.objects.filter(user=self.id).count()


class EmailVerifyRecord(models.Model):
    code = models.CharField(max_length=20, verbose_name=u"验证码")
    email = models.EmailField(max_length=50, verbose_name=u"邮箱")
    send_type = models.CharField(choices=(("register",u"注册"),("forget",u"找回密码"),("update_email",u"修改邮箱")), max_length=12, verbose_name=u"验证码类型")
    send_time = models.DateTimeField(default=datetime.now, verbose_name=u"发送时间")

    class Meta:
        verbose_name = u"邮箱验证码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return '{0}({1})'.format(self.code, self.email)


class Banner(models.Model):
    title = models.CharField(max_length=100, verbose_name=u"标题")
    image = models.ImageField(upload_to="media/banner/%Y/%m", verbose_name=u"轮播图", max_length=100)
    url = models.URLField(max_length=200, verbose_name=u"访问地址")
    index = models.IntegerField(default=100, verbose_name=u"顺序")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"轮播图"
        verbose_name_plural = verbose_name
