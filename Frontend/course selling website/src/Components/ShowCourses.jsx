import { useEffect, useState } from "react";

function ShowCourses() {
    const [courses, setCourses] = useState([]);
  
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
  
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        throw new Error(error);
      }
    };
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    return (
      <div className="bg-[#0F172A] w-full h-auto flex flex-wrap justify-center">
        {courses.map((course) => {
          return <Course key={course._id} course={course} />;
        })}
      </div>
    );
  }
  
  function Course({ course }) {
    return (
      <div
        className="bg-white p-6 rounded-md max-w-sm m-6 cursor-pointer transform transition-transform duration-300 hover:scale-105"
        style={{
          boxShadow: "0 0 60px rgba(255, 255, 255, 0.2)",
          width: "350px",
        }}
      >
        <img
          src={course.imageLink}
          alt=""
          className="w-full h-40 object-cover mb-4 rounded-md"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {course.title}
        </h2>
        <div className="line h-1 w-full bg-black opacity-30 mb-2"></div>
        <div className="price flex items-center gap-2 text-xl font-bold">
          <div className="discount-price text-purple-700 font-bold">
            {course.price}
          </div>
          <div className="real-price line-through text-gray-500 opacity-50">
            ₹7000
          </div>
          <span className="discount bg-green-500 text-white font-bold rounded-md p-1">
            42% off
          </span>
        </div>
      </div>
    );
  }
  
  export default ShowCourses;
  