import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-28 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-slide-down">
            Empower Your Learning Journey
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Explore courses, earn certificates, and achieve your career goals with our LMS platform.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-10 py-4 text-lg rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 inline-block border-b-4 border-blue-600 pb-2 text-center">
            Featured Courses
          </h2>
          {courses.length === 0 ? (
            <p className="text-center text-gray-600">No courses available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              {courses.slice(0, 6).map(c => (
                <div
                  key={c._id}
                  className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <img
                    src={c.thumbnail || "https://via.placeholder.com/300x200"}
                    alt={c.title}
                    className="w-full h-48 object-cover transform transition duration-500 group-hover:scale-110 rounded-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mt-4">{c.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    {c.description.substring(0, 100)}...
                  </p>
                  <p className="font-semibold text-blue-600 mb-4">${c.price}</p>
                  <Link
                    to={`/course/${c._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform hover:translate-y-1"
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to start learning?</h2>
          <p className="mb-6 animate-fade-in">
            Sign up today and unlock access to all courses and certificates.
          </p>
          <Link
            to="/register"
            className="bg-green-600 text-white px-10 py-4 text-lg rounded-lg shadow-lg hover:bg-green-700 hover:shadow-2xl transition transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 text-gray-600 text-sm">
        © 2026 LMS Platform. All rights reserved. <br />
        Built with React & TailwindCSS
      </footer>
    </div>
  );
}