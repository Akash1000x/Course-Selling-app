import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const [sidbarActive, setSidbarActive] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidbarActive(false);
        console.log("false");
      } else {
        setSidbarActive(true);
        console.log("true");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4   my-4 cursor-pointer"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>

        <button
          className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4 ml-3  my-4 cursor-pointer"
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
          className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4 mr-10  my-4 ml-3 cursor-pointer"
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
  }
  //username is not null
  else {
    return (
      <div>
        {sidbarActive ? (
          <div className="relative bg-[#0F172A]">
            <button
              className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4 rounded-md ml-2 my-4 cursor-pointer"
              style={{
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={(e) => {
                e.preventDefault();
                setSidebarOpen(!isSidebarOpen);
              }}
            >
              <div class="container mx-auto my-2" onclick="myFunction(this)">
                <div class="bar1 h-1 w-6 bg-white my-1 transition-transform duration-300 ease-in-out"></div>
                <div class="bar2 h-1 w-6 bg-white my-1 transition-transform duration-300 ease-in-out"></div>
                <div class="bar3 h-1 w-6 bg-white my-1 transition-transform duration-300 ease-in-out"></div>
              </div>
              
            </button>

            {
              <div
                className="absolute z-10 font-serif w-80  h-screen bg-gray-900  transition-all duration-300 ease-in-out"
                style={{
                  transform: `${
                    isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
                  }`,
                  position: `${isSidebarOpen ? "fixed" : ""}`,
                  top: `${isSidebarOpen ? "0" : ""}`,
                  // left: `${isSidebarOpen ? "0px" : "-325px"}`,
                }}
              >
                {/* <div className=" "> */}
                <button
                  className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 mt-3 px-2 w-10 my-2 text-3xl   cursor-pointer text-right absolute top-0 right-0 mr-2 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen(!isSidebarOpen);
                  }}
                >
                  X
                </button>

                <div className="text-white font-bold py-4 text-2xl w-full mt-16 mb-2 ml-2 ">
                  {username}
                </div>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-4 text-3xl w-full  mt-1 cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </button>
                <div
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center"
                  onClick={() => {
                    navigate("/addcourse");
                  }}
                >
                  Add new course
                </div>
                <div
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center "
                  onClick={() => {
                    navigate("/showcourses");
                  }}
                >
                  Courses
                </div>
                <div
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center absolute bottom-20"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    window.location = "/";
                  }}
                >
                  Log out
                </div>
                {/* </div> */}
              </div>
            }
          </div>
        ) : (
          <nav className="flex  justify-end bg-[#0F172A]">
            <button
              className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-1 px-4   my-4 cursor-pointer"
              style={{
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
            <div
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 my-4 ml-4 cursor-pointer"
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 mr-10 my-4 ml-4 cursor-pointer"
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
            <div className="text-white font-bold py-1 px-4 mt-4">
              {username}
            </div>

            <div
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 mr-10 my-4  ml-3 cursor-pointer"
              style={{
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Log out
            </div>
          </nav>
        )}
      </div>
    );
  }

  // function SideBar(){
  //   return (
  //     <div className={`${isSidebarOpen ? "absolute z-10 font-serif w-80  h-screen bg-gray-900 opacity-95 transition-all duration-500 ease-in-out" : ""} `}
  //     style={{
  //       left: `${isSidebarOpen ? "0px" : "-325px"}`,
  //     }}>
  //       {/* <div className=" "> */}
  //       <div className="text-white font-bold py-4 text-2xl w-full mt-1 ml-2">{username}</div>
  //       <button
  //         className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-4 text-3xl w-full  mt-1 cursor-pointer"
  //         onClick={() => {
  //           navigate("/");
  //         }}
  //       >
  //         Home
  //       </button>
  //       <div
  //         className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center"
  //         onClick={() => {
  //           navigate("/addcourse");
  //         }}
  //       >
  //           Add new course
  //       </div>
  //       <div
  //         className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center "
  //         onClick={() => {
  //           navigate("/showcourses");
  //         }}
  //       >
  //         Courses
  //       </div>
  //       <div
  //         className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer py-4 text-2xl w-full mt-1 text-center absolute bottom-20"
  //         onClick={() => {
  //           localStorage.setItem("token", null);
  //           window.location = "/";
  //         }}
  //       >
  //         Log out
  //       </div>
  //       {/* </div> */}
  //     </div>
  //   )
  // }
}

export default Appbar;
