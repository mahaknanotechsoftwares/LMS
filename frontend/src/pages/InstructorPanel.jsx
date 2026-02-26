import { useEffect, useState } from "react";
import API from "../services/api";

export default function InstructorPanel() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", thumbnail: "" });

  useEffect(() => {
    API.get("/instructor/courses").then(res => setCourses(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/instructor/courses", form);
      setCourses([...courses, data]);
      setForm({ title: "", description: "", price: "", thumbnail: "" });
    } catch (err) {
      alert("Error creating course: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Instructor Panel</h1>

      {/* Course Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Course
        </button>
      </form>

      {/* Course List */}
      <h2 className="text-xl font-semibold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(c => (
          <div key={c._id} className="bg-gray-50 shadow rounded p-4">
            <h3 className="font-bold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="font-semibold mt-2">${c.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}