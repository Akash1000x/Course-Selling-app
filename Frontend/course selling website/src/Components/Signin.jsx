import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";


function Signin() {
  const [username, setUsername] = useRecoilState(userState);
  const [password, setPassword] = useRecoilState(passwordState);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      // Reload the window after successful login
      if(data.token){
        window.location ="/showcourses"
      }

    } catch (error) {
      console.log("ERROR", error);
    }
    
    setUsername("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen bg-[#0F172A]  ">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-500 mt-20 text-center">
            Welcome back!
          </h1>
          <p className="text-2xl font-semibold text-gray-400 text-center ">
            Let's get you signed in
          </p>
        </div>
        <form
          action=""
          className="p-6 mt-10 w-96 bg-white"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.1)" }}
        >
          <div className="input">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="mt-6 block w-full px-3 py-2 bg-white border border-slate-300  text-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             "
             
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
              password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border mt-4 w-full p-2 mb-4 focus:outline-none text-sm placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>
          <center>
            <button
              className="bg-indigo-600 hover:bg-indigo-700  active:bg-indigo-800  text-white font-bold py-2 w-full my-8"
              style={{
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleLogin}
            >
              Log in
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Signin;


const userState = atom({
  key:'userState',
  default:"",
});

const passwordState = atom({
  key:'passwordState',
  default:"",
})