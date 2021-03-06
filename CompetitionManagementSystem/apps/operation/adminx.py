# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/1/20 15:32'

import xadmin

from .models import CompetitionComments, UserFavorite, UserMessage, UserCompetition, UserTeam, UserApply


class CompetitionCommentsAdmin(object):
    list_display = ["user", "competition", "comments", "add_time"]
    search_fields = ["code", "email",  "comments"]
    list_filter = ["user", "competition", "comments", "add_time"]


class UserFavoriteAdmin(object):
    list_display = ["user", "fav_id", "add_time"]
    search_fields = ["user", "fav_id"]
    list_filter = ["user", "fav_id", "add_time"]


class UserMessageAdmin(object):
    list_display = ["user", "message", "has_read", "add_time"]
    search_fields = ["user", "message", "has_read"]
    list_filter = ["user", "message", "has_read", "add_time"]


class UserCompetitionAdmin(object):
    list_display = ["user", "competition", "add_time"]
    search_fields = ["user", "competition"]
    list_filter = ["user", "competition", "add_time"]


class UserTeamAdmin(object):
    list_display = ["team", "competition", "rank", "teacher", "add_time"]
    search_fields = ["team", "competition", "rank", "teacher"]
    list_filter = ["team", "competition", "rank", "teacher", "add_time"]


class UserApplyAdmin(object):
    list_display = ["user", "competition_name", "level", "rank","is_certified", "add_time"]
    search_fields = ["user", "competition_name", "level", "rank","is_certified"]
    list_filter = ["user", "competition_name", "level", "rank","is_certified", "add_time"]

xadmin.site.register(CompetitionComments, CompetitionCommentsAdmin)
xadmin.site.register(UserFavorite, UserFavoriteAdmin)
xadmin.site.register(UserMessage, UserMessageAdmin)
xadmin.site.register(UserCompetition, UserCompetitionAdmin)
xadmin.site.register(UserTeam, UserTeamAdmin)
xadmin.site.register(UserApply, UserApplyAdmin)