import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Studentnavbar } from "./Studentnavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("https://codebackend-t492.onrender.com/login", { email, password }, { withCredentials: true })
      .then((res) => {
        const { batchname, branchname, email } = res.data;
        console.log("batchname",batchname);
        console.log("branchname",branchname);
        console.log("email",email);

        
        navigate("/studentlessons", { state: { batchname, branchname, email } });
      })
      .catch((err) => alert(err.response?.data?.message || "Login failed"));
  };

  return (
    <>
    <Studentnavbar></Studentnavbar>
     <div className="container mt-5">
      <h3 className="mb-4">Student Login</h3>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
    </>
   
  );
}