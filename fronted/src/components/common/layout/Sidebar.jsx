import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#eee", padding: "10px" }}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/student/dashboard">Student Dashboard</Link></li>
        <li><Link to="/instructor/dashboard">Instructor Dashboard</Link></li>
        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;