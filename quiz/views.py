from django.http import JsonResponse,  Http404
from .models import Quiz
# Create your views here.


def quizzes_list(request):
    quizzes = list(Quiz.objects.values('id','title'))
    return JsonResponse({"quizzes": quizzes})

def quiz_questions(request, quiz_id):
    try:
        quiz = Quiz.objects.get(id=quiz_id)
    except Quiz.DoesNotExtst:
        raise Http404("Quiz not Found!")
    
    questions = []
    for q in quiz.questions.all():
        questions.append({
            "id": q.id,
            "question_text":q.question_text,
            "options":q.options,
        })
    return JsonResponse({"quiz":{"id":quiz.id,"title":quiz.title,"questions":quiz.questions}})