import React from "react";
import { Routes, Route } from "react-router-dom";

 import  Home from "../ pages / public/ Home";
import Courses from ".. /pages/ public/ Courses";
import CourseDetails from "../ pages/ public/ CourseDetails";
import Login from "../ pages/ public/Login";
 import StudentDashboard from ".. / pages /student / Dashboard";
import InstructorDashboard from "../ pages/ instructor/ Dashboard";
import  AdminDashboard from "../ pages/ admin/ Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Public  */}
      <Route path="/" element={<Home />} />
       <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={< CourseDetails />}  />
    <Route path="/login" element={<Login />} />

                 {/* Student  */}
      <Route path="/student/dashboard" element={< StudentDashboard />} />

              {/* Instructor */}
      <Route path="/instructor/dashboard" element={< InstructorDashboard  />} />

             {/* Admin */}
      <Route path="/admin/dashboard" element={<  AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;