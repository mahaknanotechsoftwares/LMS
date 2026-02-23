import React, { useState } from "react";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
     <h2>Login</h2>
       <form onSubmit ={handleSubmit }>
         <div style ={{ marginBottom: "10px" }}>
          <label>Email:</label>
     <input
            type="email"
             placeholder ="Enter your email"
              value ={email} 
            onChange ={(e) => setEmail(e.target.value)} 
             style ={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
              </div>


   <div style={{ marginBottom: "10px" }}>
           <label>Password:</label>
                 <input
            type="password"
                 placeholder="Enter your password"
             value ={password}
             onChange ={(e) => setPassword(e.target.value)}
                 style ={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
       />


</div>
           <button
            type="submit"
             style ={{ padding: "10px 20px", cursor: "pointer" }}
        >
         Login
         </button>
     </form>
  </div>
  );
};

export default Login;