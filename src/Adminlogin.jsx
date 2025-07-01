import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Studentnavbar } from "./Studentnavbar";

export const Adminlogin = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const handleLogin = (e) => {
    e.preventDefault();
    if((email == "admin@gmail.com") && (password == "1234")){
        navigate('/adminhome')
    }
    else{
        navigate('/')
    }
  };
  return (
    <div>
        <Studentnavbar></Studentnavbar>
        <div className="container mt-5">
            <h3 className="mb-4">Admin Login</h3>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="btn btn-primary w-100" type="submit">Login</button>
            </form>
        </div>

    </div>
  )
}
