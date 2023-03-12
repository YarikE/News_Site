from django import forms
from .models import *


class WomenForm(forms.ModelForm):

    class Meta:
        model = Women
        fields = ['title', 'content', 'photo', 'cat_id']
