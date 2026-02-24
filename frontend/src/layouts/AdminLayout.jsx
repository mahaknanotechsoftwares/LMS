//  AdminLayout
import React from "react";
import Navbar from "../components/common/layout/Navbar";
import Sidebar from "../components/common/layout/Sidebar" ;

const AdminLayout = ({ children }) => {
      return (
  <div>
        <Navbar />
    <div style={{ display: "flex" }}>
        <Sidebar />
         <main style={{ padding: "20px", flex: 1 }}>{children}</main>
      </div>
     </div>
  );
};

export default AdminLayout;