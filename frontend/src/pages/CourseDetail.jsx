import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handleEnroll = async () => {
    try {
      await API.post(`/students/enroll/${id}`);
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error enrolling: " + err.message);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <p className="mb-4">Price: ${course.price}</p>

      <button onClick={handleEnroll} className="bg-blue-600 text-white px-4 py-2 rounded">
        Enroll
      </button>

      <h3 className="text-lg font-bold mt-6">Lessons</h3>
      <ul>
        {course.lessons?.map((lesson, idx) => (
          <li key={idx} className="border p-2 mb-2">
            <p>{lesson.title}</p>
            {lesson.videoUrl && (
              <video src={lesson.videoUrl} controls className="w-full mt-2" />
            )}
            {lesson.resources?.map((res, i) => (
              <a key={i} href={res} className="text-blue-500 block mt-1" download>
                Download Resource {i+1}
              </a>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}