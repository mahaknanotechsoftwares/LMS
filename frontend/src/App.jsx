import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import InstructorPanel from "./pages/InstructorPanel";
import AdminPanel from "./pages/AdminPanel";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CertificatePage from "./pages/CertificatePage";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <PrivateRoute>
              <CourseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/course/:id/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/certificate/:id"
          element={
            <PrivateRoute>
              <CertificatePage />
            </PrivateRoute>
          }
        />

        {/* Instructor routes */}
        <Route
          path="/instructor"
          element={
            <PrivateRoute role="instructor">
              <InstructorPanel />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminPanel />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;