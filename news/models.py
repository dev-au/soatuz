from django.contrib.auth.models import User
from django.db import models
from django.db.models import Count


class NewsCategory(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class New(models.Model):
    category = models.ForeignKey(NewsCategory, on_delete=models.CASCADE, related_name='news')
    journalist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journalist')
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='news_images')
    short_description = models.TextField()
    body = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='news')
    published_date_time = models.DateTimeField(auto_now_add=True)
    views = models.BigIntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

    def get_recommended_news(self, limit=5):
        similar_news = New.objects.filter(
            tags__in=self.tags.all()
        ).exclude(id=self.id).annotate(
            same_tags=Count('tags')
        ).order_by('-same_tags', '-published_date_time')[:limit]
        return similar_news
