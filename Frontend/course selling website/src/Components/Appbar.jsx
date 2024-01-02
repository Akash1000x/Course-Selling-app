import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/admin/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json(); // Return the promise
        })
        .then((data) => {
          console.log(data);
          setUsername(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  if (!username) {
    return (
      <nav className="flex  justify-end bg-[#0F172A]">
        <button
          className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4   mt-4 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate("/Signin");
          }}
        >
          Log in
        </button>

        <button
          className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4 mr-10  mt-4 ml-3 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate("/Signup");
          }}
        >
          Sign up
        </button>
      </nav>
    );
  }else {
    return (
      <nav className="flex  justify-end bg-[#0F172A]">
         <div
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 mr-10 mt-4 ml-3 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate("/addcourse");
          }}
        >
            Add new course
        </div>
        <div
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 mr-10 mt-4 ml-3 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate("/showcourses");
          }}
        >
          Courses
        </div>
        <div className="text-white font-bold py-1 px-4 mt-4">{username}</div>

        <div
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 mr-10 mt-4 ml-3 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            localStorage.setItem("token", null);
            window.location = "/Signin";
          }}
        >
          Log out
        </div>
      </nav>
    );
  }
}

export default Appbar;
