from django.urls import path

from .views import NewsCategoryListView, NewsArticleListView, NewsDetailView, RecommendedNewsView, SearchNewsView

urlpatterns = [
    path('all-categories/', NewsCategoryListView.as_view(), name='news-category-list'),
    path('<int:id>/', NewsDetailView.as_view(), name='news-detail'),
    path('rec/<int:id>/', RecommendedNewsView.as_view(), name='recommended-news'),
    path('search/<str:query>/', SearchNewsView.as_view(), name='news-article-search'),
    path('', NewsArticleListView.as_view(), name='news-article-list'),
]
