import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get("/students/enrollments").then(res => setEnrollments(res.data));
    API.get("/students/certificates").then(res => setCertificates(res.data));
    API.get("/students/quizzes").then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="animate-fade-in bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight animate-slide-down">
          Student Dashboard
        </h1>
        <p className="text-gray-600 mt-3 animate-fade-in">
          Manage your courses, certificates, and quizzes all in one place.
        </p>
      </header>

      {/* Courses */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-blue-600 pb-2">
          My Courses
        </h2>
        {enrollments.length === 0 ? (
          <p className="text-gray-600 text-center">No courses enrolled yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map(e => (
              <div
                key={e._id}
                className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-gray-800">{e.course.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{e.course.description}</p>
                <Link
                  to={`/course/${e.course._id}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Go to Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Certificates */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-green-600 pb-2">
          My Certificates
        </h2>
        {certificates.length === 0 ? (
          <p className="text-gray-600 text-center">No certificates earned yet.</p>
        ) : (
          <div className="space-y-6">
            {certificates.map(c => (
              <div
                key={c._id}
                className="bg-green-50 border border-green-200 rounded-lg p-6 flex justify-between items-center transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105"
              >
                <div>
                  <p className="text-lg font-bold text-green-700">{c.courseTitle}</p>
                  <p className="text-sm text-gray-600">
                    Issued on {new Date(c.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/certificate/${c._id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                  View Certificate
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quizzes */}
      <section>
        <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-yellow-500 pb-2">
          My Quizzes
        </h2>
        {quizzes.length === 0 ? (
          <p className="text-gray-600 text-center">No quizzes attempted yet.</p>
        ) : (
          <div className="space-y-6">
            {quizzes.map(q => (
              <div
                key={q._id}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex justify-between items-center transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105"
              >
                <div>
                  <p className="text-lg font-bold text-yellow-700">{q.quizTitle}</p>
                  <p className="text-sm text-gray-600">
                    Score: {q.score}/{q.total}
                  </p>
                </div>
                <Link
                  to={`/course/${q.courseId}/quiz`}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition transform hover:scale-105"
                >
                  Retake Quiz
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}