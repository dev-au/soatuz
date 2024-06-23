from django_filters import rest_framework as filters

from news.models import New


class NewsArticleFilter(filters.FilterSet):
    category = filters.NumberFilter(field_name='category__id')
    state = filters.ChoiceFilter(choices=New.State.choices)
    published_after = filters.DateTimeFilter(field_name='published_date_time', lookup_expr='gte')
    published_before = filters.DateTimeFilter(field_name='published_date_time', lookup_expr='lte')

    class Meta:
        model = New
        fields = ['category', 'state', 'published_after', 'published_before']
