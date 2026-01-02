from django.http import JsonResponse
from .models import Quiz, Question

def quizzes_list(request):
    quizzes = Quiz.objects.all().values("id", "title")
    return JsonResponse({"quizzes": list(quizzes)})

def quiz_questions(request, quiz_id):
    questions = Question.objects.filter(quiz_id=quiz_id).values(
        "id", "question_text", "options", "correct_index"
    )
    return JsonResponse({"questions": list(questions)})
