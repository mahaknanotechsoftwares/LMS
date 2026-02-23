// layouts AdminLayout
import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="admin" />

      
      <div className=" flex-1 flex flex-col">
        <Header role="admin" />
        <main className="p-6 flex-1 overflow-auto"> {children} </main>
      </div>
    </div>
  );
};

export default AdminLayout;