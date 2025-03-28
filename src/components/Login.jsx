import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    if(!email && !password){
        setError("Email and Password are required")
        return;
    }

    try {
        const response = await fetch("https://reqres.in/api/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const data=await response.json()
        if(!response.ok){
            throw new Error(data.error || "Login failed. Please try again.");
        }
        localStorage.setItem("token",data.token)
        navigate('/users')
    } catch (error) {
        setError(error.message  )
    }

    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter password"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
