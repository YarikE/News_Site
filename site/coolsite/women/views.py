from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .serialaizers import WomenSerializer

from django.http import HttpResponse, HttpResponseNotFound, Http404, JsonResponse
from django.shortcuts import render

from .models import *


menu = [{"title": "О сайте", "url_name": "about"},
        {"title": "Добавить статью", "url_name": "add_page"},
        {"title": "Обратная связь", "url_name": "contact"},
        {"title": "Войти", "url_name": "login"}]


def index(request):  # Http request
    posts = Women.objects.all()
    cats = Category.objects.all()

    context = {
        "posts": posts,
        "cats": cats,
        "menu": menu,
        "title": "Главное меню",
        'cat_selected': 0
    }

    return render(request, 'women/index.html', context=context)


def about(request):  # Http request
    return render(request, 'women/about.html', {'menu': menu, 'title': 'О сайте :)'})


def categories(request, catId):
    print(request.POST)
    return HttpResponse(f'<h1>Статьи по категориям<h1><p>{catId}<p>')


def archive(request, year):
    return HttpResponse(f'<h1>Архив по годам<p>{year}<p><h1>')


def addpage(request):
    return HttpResponse("Добавление статьи")


def contact(request):
    return HttpResponse("Обратная связь")


def login(request):
    return HttpResponse("Авторизация")


def show_post(request, post_id):
    post = Women.objects.filter(id=post_id)

    context = {
        'posts': post,
        'menu': menu,
        'title': 'Отображение по рубрикам',
        'cat_selected': post_id
    }

    return render(request, 'women/post.html', context=context)


def show_category(request, cat_id):
    posts = Women.objects.filter(cat_id=cat_id)
    cats = Category.objects.all()

    if len(posts) == 0:
        raise Http404()

    context = {
        'posts': posts,
        'cats': cats,
        'menu': menu,
        'title': 'Отображение по рубрикам',
        'cat_selected': cat_id
    }

    return render(request, 'women/index.html', context=context)


def pageNotFound(request, exception):
    return HttpResponseNotFound('<h1>Страница не найдена(<h1>')


class WomenAPIView(generics.ListAPIView):
    queryset = Women.objects.all()
    serializer_class = WomenSerializer


class WomenAPIView(APIView):
    def get(self, request):
        lst = Women.objects.all().values()
        return Response({'posts': list(lst)})

    def post(self, request):
        post_new = Women.objects.create(
            title=request.data['title'],
            content=request.data['content'],
            cat_id=request.data['cat_id'],
            photo=request.data['photo']
        )
        return Response({'post': model_to_dict(post_new)})


# Функция представления для "+ лайка"
@csrf_exempt
def likes_plus_update(request, post_id):
    if request.method == 'POST':
        data_bd = Women.objects.get(id=post_id)
        data_bd.likes += 1
        data_bd.save()
        data = {
            'id': data_bd.id,
            'title': data_bd.title,
            'content': data_bd.content,
            'likes_count': data_bd.likes
        }
        return JsonResponse(data)

# Функция представления для "- лайка"
@csrf_exempt
def likes_minus_update(request, post_id):
    if request.method == 'POST':
        data_bd = Women.objects.get(id=post_id)
        data_bd.likes -= 1
        data_bd.save()

        data = {
            'id': data_bd.id,
            'title': data_bd.title,
            'content': data_bd.content,
            'likes_count': data_bd.likes
        }
        return JsonResponse(data)


# Request for scroll
@csrf_exempt
def scroll_data(request, post_id):
    if request.method == 'POST':
        data_db = Women.objects.get(id=post_id)
        data = {
            'id': data_db.id,
            'title': data_db.title,
            'content': data_db.content,
            'time_update': data_db.time_update,
            'is_published': data_db.is_published,
            'time_create': data_db.time_create,
            'cat_id': data_db.cat_id,
            'likes': data_db.likes
        }
        return JsonResponse(data)


