import { useState, useEffect } from 'react'



const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setquestions] = useState([]);
  const [selectedQuiz, setselectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] =  useState(null);


  useEffect(() => {
    fetch('${API_BASE}/api/quizzes/')
    .then(res => res.json())
    .then(data => setQuizzes(data.quizzes || []));
  }, []);

  const loadQuestions = (quizid) => {
    setselectedQuiz(quizid);
    setScore(null);
    setAnswers({});
    fetch('${API_BASE}/api/quizzes/${quizid}/questions')
    .then(res => res.json())
    .then(data => setquestions(data.questions || []));
  };

  const handleAnswer = (qid, index) => {
    setAnswers(prev => ({ ...prev, [qid]: index}));

  };

  const submitQuiz = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_index) correct++;
    });
    setScore(correct);
  }
  const resetQuiz = () => {
    setselectedQuiz(null);
    setquestions([]);
    setAnswers({});
    setScore(null);
  }

  return (
    <div style={{ padding:20}}>
      <h1>Quiz APP DASHBOARD </h1>
      <h2>Quizzess</h2>
      <ul>
        {
          quizzes.map(q => (
            <li key={q.id}>
              {q.title} <button onClick={() => loadQuestions(q.id)}>START HERE</button>
            </li>))
        }
      </ul>
      {selectedQuiz && (
        <>
        <h2>Questions</h2>
        {
          questions.map((q,i) => (
            <div key={q.id}>
              <strong>Q{i + 1}:</strong>{q.question_text}
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </div>
          ))
        }
        </>
      )}
    </div>
  )
}