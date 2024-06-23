from django.contrib import admin

from .models import NewsCategory, New, Tag


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug',)
    search_fields = ('title',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(New)
class NewAdmin(admin.ModelAdmin):
    list_display = ('title', 'journalist', 'category', 'published_date_time')
    list_filter = ('published_date_time', 'category')
    search_fields = ('name', 'short_description', 'body', 'tag', 'journalist__user__username')
    date_hierarchy = 'published_date_time'
    filter_horizontal = ('tags',)

