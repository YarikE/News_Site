from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('', index, name='home'),  # https://127.0.0.1:8000
    path('about/', about, name='about'),
    path("addpage/", addpage, name="add_page"),
    path("contact/", contact, name="contact"),
    path("login/", login, name="login"),
    path("post/<int:post_id>/", show_post, name="post"),
    path('category/<int:cat_id>/', show_category, name='category'),
    path('api/v1/newslist/', WomenAPIView.as_view()),
    path("likes-plus/<int:post_id>/", likes_plus_update, name='likes_plus_update'),
    path("likes-minus/<int:post_id>/", likes_minus_update, name='likes_minus_update'),
    path("posts-scroll/<int:post_id>/", scroll_data, name='scroll_data')
]
