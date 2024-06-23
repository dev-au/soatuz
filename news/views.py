from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from news.models import New, NewsCategory, Tag
from .pagination import LatestNewsPagination
from .serializers import AllNewsCategoriesSerializer, NewsArticlesSerializer, NewsDetailSerializer


class NewsCategoryListView(generics.ListAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = AllNewsCategoriesSerializer


class NewsArticleListView(generics.ListAPIView):
    serializer_class = NewsArticlesSerializer
    pagination_class = LatestNewsPagination
    ordering = ['-published_date_time']

    def get_queryset(self):
        count = self.request.query_params.get('count', 0)
        if count != 0 and not count.isnumeric():
            return Response({'error': 'count is invalid'}, status=status.HTTP_400_BAD_REQUEST)
        queryset = New.objects.filter()
        category = self.request.query_params.get('category', 'all')
        if category != 'all':
            queryset = queryset.filter(category__slug=category)
        queryset = queryset.order_by('-published_date_time')
        return queryset[:int(count)]


class NewsDetailView(APIView):
    def get(self, request, id):
        try:
            news_detail = New.objects.get(id=id)
        except New.DoesNotExist:
            return Response({"error": "NewsNotFound"}, status=404)
        try:
            news_detail.views += 1
            news_detail.save()
        except OverflowError:
            pass

        serializer = NewsDetailSerializer(news_detail)
        return Response(serializer.data)


class RecommendedNewsView(APIView):

    def get(self, request, id):
        new = get_object_or_404(New, id=id)
        recommended_news = new.get_recommended_news()
        serializer = NewsArticlesSerializer(recommended_news, many=True)
        return Response(serializer.data)


class SearchNewsView(APIView):
    def get(self, request, query):
        query = str(query).strip()
        if query.startswith('tag:'):
            tag_name = query[4:]
            tag = get_object_or_404(Tag, name=tag_name)
            results_search = New.objects.filter(tags=tag).order_by('-published_date_time')
        else:
            results_search = New.objects.filter(title__icontains=query).order_by('-published_date_time')
        serializer = NewsArticlesSerializer(results_search, many=True)
        return Response(serializer.data)
