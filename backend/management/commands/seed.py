from django.core.management.base import BaseCommand
from quiz.models import Quiz, Question

class Command(BaseCommand):
    help = "seed db with some quiz and questions"
    
    def handle(self,*args, **kwargs):
        quiz = Quiz.objects.create(title="GK")
        Question.objects.create(
            quiz=quiz,
            question_text = "what is 20 + 20?",
            options = ["40", "60", "70"],
            correct_index = 1,
        )
        
        self.stdout.write(self.style.SUCCESS("DB CREATED SUCCESFULLY!"))