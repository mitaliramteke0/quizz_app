from django.contrib import admin
from .models import Question,Quiz
# Register your models here.

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 0

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_disaply  = ("id","title")
    inlines = [QuestionInline]