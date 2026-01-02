-Build Full-stack Quiz App with Django(backend side) amd React(frontend side)
-store quiz and questions in MYSQL DB
-Display quiz and questions in REACT UI
-

<!-- Backend Setup -->
-django project setup with mysql
-crete model - quiz : title and  question : correct_index, question_text, options(json)
-seed command
'python manage.py seed'
- API ENDPOINTS:
GET '/api/quizzes/'
GET ''api/quizzes/<id>/questions/' 


-CORS configuratino for frontend 

<!-- FRONTEND SETUP -->

-Set react app with VITE
- Quiz dashboard (App.jsx)
        - list quizzes
        - load questions
        - track anser
        
        - submit ans score quiz
-run on server     "http://127.0.0.1:5173",


<!-- TESTING -->
django test
-python manage.py runserver

react test
-npm run dev