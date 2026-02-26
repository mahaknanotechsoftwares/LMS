import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}/quiz`).then(res => setQuiz(res.data));
  }, [id]);

  const handleChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.post(`/courses/${id}/quiz/submit`, { answers });
      setResult(data);
    } catch (err) {
      alert("Error submitting quiz: " + err.message);
    }
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <div key={q._id} className="mb-4">
          <p className="font-semibold">{idx+1}. {q.text}</p>
          {q.options.map(opt => (
            <label key={opt} className="block">
              <input
                type="radio"
                name={q._id}
                value={opt}
                checked={answers[q._id] === opt}
                onChange={() => handleChange(q._id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Quiz
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Your Score: {result.score}/{quiz.questions.length}</h3>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
}