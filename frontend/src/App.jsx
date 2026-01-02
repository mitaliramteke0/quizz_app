import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Load quizzes on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/quizzes/`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data.quizzes || []));
  }, []);

  // Load questions for a quiz
  const loadQuestions = (quizId) => {
    setSelectedQuiz(quizId);
    setScore(null);
    setAnswers({});
    fetch(`${API_BASE}/api/quizzes/${quizId}/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
  };

  // Handle answer selection
  const handleAnswer = (qid, index) => {
    setAnswers((prev) => ({ ...prev, [qid]: index }));
  };

  // Submit quiz
  const submitQuiz = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_index) correct++;
    });
    setScore(correct);
  };

  // Reset quiz
  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuestions([]);
    setAnswers({});
    setScore(null);
  };

  return (
    <div className="dashboard">
      <h1>Quiz App Dashboard</h1>

      {!selectedQuiz && (
        <>
          <h2>Available Quizzes</h2>
          <ul>
            {quizzes.map((q) => (
              <li key={q.id}>
                {q.title}{" "}
                <button onClick={() => loadQuestions(q.id)}>Start Quiz</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedQuiz && (
        <div className="quiz-section">
          <h2>Questions</h2>
          {questions.map((q, i) => (
            <div key={q.id} className="question-block">
              <p>
                <strong>Q{i + 1}:</strong> {q.question_text}
              </p>
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

          <div className="quiz-actions">
            <button onClick={submitQuiz}>Submit Quiz</button>
            <button onClick={resetQuiz}>Back to Dashboard</button>
          </div>

          {score !== null && (
            <h3>
              ✅ You scored {score} out of {questions.length}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
