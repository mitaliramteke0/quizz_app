from django.db import models

# Create your models here.

'''Admin Panel
Ability to create a quiz with:
Quiz title
A few questions of various types (MCQ, True/False, text, etc.)


Public Page
A page where a quiz can be taken by anyone
Display results after completion (e.g., score or correct answers)
'''
class Quiz(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions',on_delete=models.CASCADE)
    question_text =  models.CharField(max_length=500)
    options = models.JSONField() # to store option as json
    correct_index = models.IntegerField(default=0) # to check index of correct option

    def __str__(self):
        return self.question_text