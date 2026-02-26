import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
    API.get("/admin/courses").then(res => setCourses(res.data));
    API.get("/admin/reports").then(res => setReports(res.data));
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  const deleteCourse = async (id) => {
    await API.delete(`/admin/courses/${id}`);
    setCourses(courses.filter(c => c._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Users */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Courses */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
        <ul className="space-y-3">
          {courses.map(c => (
            <li key={c._id} className="bg-white shadow rounded p-4 flex justify-between">
              <div>
                <p className="font-bold">{c.title}</p>
                <p className="text-sm text-gray-600">Instructor: {c.instructor?.name}</p>
              </div>
              <button
                onClick={() => deleteCourse(c._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Reports */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Reports</h2>
        <div className="space-y-3">
          {reports.map(r => (
            <div key={r._id} className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="font-bold">{r.title}</p>
              <p className="text-sm text-gray-600">{r.description}</p>
              <p className="text-sm text-gray-500">Submitted by: {r.user?.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}