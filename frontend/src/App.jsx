import { useState, useEffect } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Load quizzes
  useEffect(() => {
    fetch(`${API_BASE}/api/quizzes/`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data.quizzes || []));
  }, []);

  // Load questions
  const loadQuestions = (quizId) => {
    setSelectedQuiz(quizId);
    setScore(null);
    setAnswers({});
    fetch(`${API_BASE}/api/quizzes/${quizId}/questions/`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
  };

  const handleAnswer = (qid, index) => {
    setAnswers((prev) => ({ ...prev, [qid]: index }));
  };

  const submitQuiz = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_index) correct++;
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuestions([]);
    setAnswers({});
    setScore(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Quiz APP DASHBOARD</h1>
      <h2>Quizzes</h2>
      <ul>
        {quizzes.map((q) => (
          <li key={q.id}>
            {q.title}{" "}
            <button onClick={() => loadQuestions(q.id)}>Start Quiz</button>
          </li>
        ))}
      </ul>

      {selectedQuiz && (
        <>
          <h2>Questions</h2>
          {questions.map((q, i) => (
            <div key={q.id}>
              <strong>Q{i + 1}:</strong> {q.question_text}
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === idx}
                        onChange={() => handleAnswer(q.id, idx)}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <button onClick={submitQuiz}>Submit Quiz</button>
          <button onClick={resetQuiz}>Back to Dashboard</button>

          {score !== null && (
            <h3>
              ✅ You scored {score} out of {questions.length}
            </h3>
          )}
        </>
      )}
    </div>
  );
}
