import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Learn Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners and instructors on our LMS platform.
          Explore courses, earn certificates, and grow your skills.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}