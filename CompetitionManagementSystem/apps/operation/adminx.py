# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/1/20 15:32'

import xadmin

from .models import CompetitionComments, UserFavorate, UserMessage, UserCompetition, UserTeam


class CompetitionCommentsAdmin(object):
    list_display = ["user", "competition", "comments", "add_time"]
    search_fields = ["code", "email",  "comments"]
    list_filter = ["user", "competition", "comments", "add_time"]


class UserFavorateAdmin(object):
    list_display = ["user", "competition", "add_time"]
    search_fields = ["user", "competition"]
    list_filter = ["user", "competition", "add_time"]


class UserMessageAdmin(object):
    list_display = ["user", "message", "has_read", "add_time"]
    search_fields = ["user", "message", "has_read"]
    list_filter = ["user", "message", "has_read", "add_time"]


class UserCompetitionAdmin(object):
    list_display = ["user", "competition", "add_time"]
    search_fields = ["user", "competition"]
    list_filter = ["user", "competition", "add_time"]


class UserTeamAdmin(object):
    list_display = ["team", "competition", "rank", "leader_stu", "students", "teacher", "add_time"]
    search_fields = ["team", "competition", "rank", "leader_stu", "students", "teacher"]
    list_filter = ["team", "competition", "rank", "leader_stu", "students", "teacher", "add_time"]


xadmin.site.register(CompetitionComments, CompetitionCommentsAdmin)
xadmin.site.register(UserFavorate, UserFavorateAdmin)
xadmin.site.register(UserMessage, UserMessageAdmin)
xadmin.site.register(UserCompetition, UserCompetitionAdmin)
xadmin.site.register(UserTeam, UserTeamAdmin)