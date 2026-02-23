import Navbar from "../components/layout/Navbar";
import Sidebar from " ../components/layout/Sidebar";
const StudentLayout = ( { children} )=> {
  return(
    <div>
    <Navbar/>
      <div style= {{ display: "flex" }} >
         <Sidebar />
      <main style= {{ padding: "20px" }} >{children} </main>
      </div>
   </div>
  );
};
  