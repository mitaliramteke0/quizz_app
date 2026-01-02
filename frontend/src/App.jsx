import { useState, useEffect } from 'react'



const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setquestions] = useState([]);
  const [selectedQuiz, setselectedQuiz] = useState(null);


  useEffect(() => {
    fetch('${API_BASE}/api/quizzes/')
    .then(res => res.json())
    .then(data => setQuizzes(data.quizzes || []));
  }, []);

  const loadQuestions = (id) => {
    setselectedQuiz(id);
    fetch('${API_BASE}/api/quizzes/${id}/questions')
    .then(res => res.json())
    .then(data => setquestions(data.questions || []));
  };

  return (
    <div style={{ padding:20}}>
      <h1>Quiz APP</h1>
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