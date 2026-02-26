import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-sm mb-2">{course.description}</p>
      <p className="font-semibold mb-2">${course.price}</p>
      <Link
        to={`/course/${course._id}`}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        View Course
      </Link>
    </div>
  );
}