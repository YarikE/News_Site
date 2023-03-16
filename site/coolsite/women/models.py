from django.db import models
from django.urls import reverse


class Women(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    photo = models.ImageField(upload_to="photos/%Y/%m/%d", null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, null=True)
    likes = models.IntegerField(null=True)

    def add_like(self):
        self.likes+=1
        self.save()

    def add_like_dict(self):
        return {"id":self.id,"likes":self.likes}
    # def __str__(self):
    #     return self.title

    class Meta:
        verbose_name = 'Новости :)'
        verbose_name_plural = 'Новости :)'
        ordering = ['time_create', 'title']


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_id': self.pk})
