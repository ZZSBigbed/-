# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/1/20 15:01'

import xadmin

from .models import Team

class TeamAdmin(object):

    list_display = ["name", "desc", "add_time"]
    search_fields = ["name", "desc"]
    list_filter = ["name", "desc", "add_time"]

xadmin.site.register(Team, TeamAdmin)