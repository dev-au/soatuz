from rest_framework import serializers

from news.models import NewsCategory, New, Tag


class AllNewsCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = '__all__'


class NewsArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = New
        fields = ['id', 'category', 'title', 'image', 'short_description', 'published_date_time', 'views']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class NewsDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = New
        fields = '__all__'


# class RecommendedNewsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = New
#         fields = '__all__'
