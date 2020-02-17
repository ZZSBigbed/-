# _*_ coding: utf-8 _*_
__author__ = 'cody'
__date__ = '2020/1/20 14:50'

import xadmin

from .models import Competition, CompetitionResource


class CompetitionAdmin(object):

    list_display = ["name", "desc", "detail", "level", "start_date", "end_date", "students", "fav_nums", "click_nums", "add_time"]
    search_fields = ["name", "desc", "detail", "level", "start_date", "end_date"]
    list_filter = ["name", "desc", "detail", "level", "start_date", "end_date","students", "fav_nums", "click_nums", "add_time"]


class CompetitionResourceAdmin(object):

    list_display = ["competition", "name", "download", "add_time"]
    search_fields = ["competition", "name", "download"]
    list_filter = ["competition__name", "name", "download", "add_time"]


xadmin.site.register(Competition, CompetitionAdmin)
xadmin.site.register(CompetitionResource, CompetitionResourceAdmin)