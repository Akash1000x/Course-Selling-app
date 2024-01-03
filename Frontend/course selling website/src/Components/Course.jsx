import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

function Course() {
  let { courseId } = useParams();
  let [courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setCourses(data.courses);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [currentCourse, setCurrntCourse] = useState({});

  useEffect(() => {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i]._id === courseId) {
        setCurrntCourse(courses[i]);
      }
    }
  }, [courses, courseId]);

  if (Loading) {
    return (
      <div className="bg-[#0F172A] w-full h-auto">
        <Loader />
      </div>
    );
  }

  if (Object.keys(currentCourse).length === 0) {
    return (
      <div className="bg-[#0F172A] w-full h-screen  flex justify-center items-center ">
        <h1 className=" text-5xl font-bold text-red-600">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] w-full h-screen  flex justify-center  pt-32">
      <div
        className="bg-white p-6 rounded-md max-w-sm m-6 mt-0 cursor-pointer transform transition-transform duration-300 hover:scale-105"
        style={{
          boxShadow: "0 0 60px rgba(255, 255, 255, 0.2)",
          width: "350px",
          height: "fit-content",
        }}
      >
        <img
          src={currentCourse.imageLink}
          alt=""
          className="w-full h-40 object-cover mb-4 rounded-md"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {currentCourse.title}
        </h2>
        <div className="line h-1 w-full bg-black opacity-30 mb-2"></div>
        <div className="price flex items-center gap-2 text-xl font-bold">
          <div className="discount-price text-purple-700 font-bold">
            {currentCourse.price}
          </div>
          <div className="real-price line-through text-gray-500 opacity-50">
            ₹7000
          </div>
          <span className="discount bg-green-500 text-white font-bold rounded-md p-1">
            42% off
          </span>
        </div>
      </div>
      <div>
        <form
          action=""
          className="p-6  w-96 bg-white ml-10 rounded-md"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-2xl font-bold mb-4">Update Course Details</h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image Link"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 w-full"
            style={{
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleUpdateCourse();
            }}
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );

  async function handleUpdateCourse() {
    console.log("Updating course");
    console.log("Course id", courseId);

    try {
      const response = await fetch(
        `http://localhost:3000/admin/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            description,
            price,
            imageLink,
          }),
        }
      );
      if(response.ok){
        setCurrntCourse({
          ...currentCourse,
          title,
          description,
          price,
          imageLink,
        })
      }
      const data = await response.json();
      console.log("Updated course", data);
      setTitle("");
      setDescription("");
      setPrice("");
      setImageLink("");
    } catch (error) {
      console.log("Error in Updating courses", error);
    }
  }
}

export default Course;
