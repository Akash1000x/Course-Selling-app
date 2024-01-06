import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import editPencilPhoto from "../assets/editPencil.png";

import {  useRecoilState } from "recoil";
import { currentCourseState,titleState,descriptionState,imageState,priceState } from "./atom.js";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

function Course() {
  {
    console.log("hi there from course");
  }
  let { courseId } = useParams();
  const [Loading, setLoading] = useState(true);

  const [updateCourse, setupdateCourse] = useState(false);

  const [currentCourse, setCurrntCourse] = useRecoilState(currentCourseState);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCurrntCourse(response.data.course);

      console.log(response.data.course);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching course", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

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
      {/* {console.log("hi there from course card")} */}
      <div
        className="bg-gray-900 p-6 rounded-md max-w-sm m-6 mt-0 cursor-pointer transform transition-transform duration-300 hover:scale-105 relative"
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
        <h2 className="text-xl font-bold text-white mb-2">
          {currentCourse.title}
        </h2>
        <div className="line h-1 w-full bg-black opacity-30 mb-2"></div>
        <div className="price flex items-center gap-2 text-xl font-bold">
          <div className="discount-price text-purple-700 font-bold">
            ₹{currentCourse.price}
          </div>
          <div className="real-price line-through text-gray-500 opacity-50">
            ₹7000
          </div>
          <span className="discount bg-green-500 text-white font-bold rounded-md p-1">
            42% off
          </span>
        </div>
        <div
          className="absolute right-1 bg-purple-600 w-10 h-10 rounded-md flex items-center justify-center "
          style={{
            bottom: "320px",
          }}
          onClick={(e) => {
            e.preventDefault();
            setupdateCourse(!updateCourse);
          }}
        >
          {!updateCourse ? (
            <img src={editPencilPhoto} width={40} />
          ) : (
            <p className="font-bold text-xl">X</p>
          )}
        </div>
      </div>

      {/* update card */}
      {updateCourse && <UpdateCard courseId={courseId} />}
    </div>
  );


  async function handleUpdateCourse(
    courseId,
    title,
    description,
    price,
    imageLink
  ) {
    console.log("hi there from Updating course");
    console.log("Course id", courseId);

    try {
      const response = await axios.put(
        `http://localhost:3000/admin/courses/${courseId}`,
        {
           title,
           description,
           price,
           imageLink,
         },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCurrntCourse({
          title,
          description,
          price,
          imageLink,
        });
      }else{
        console.log("Failed to update course. Server responded with:", response.status, response.data);
      } 
    } catch (error) {
      console.log("Error in Updating courses", error);
    }
  }

  function UpdateCard({ courseId }) {
    const [title, setTitle] = useRecoilState(titleState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [price, setPrice] = useRecoilState(priceState);
    const [imageLink, setImageLink] = useRecoilState(imageState);

    useEffect(() => {
      setTitle(currentCourse.title);
      setDescription(currentCourse.description);
      setPrice(currentCourse.price);
      setImageLink(currentCourse.imageLink);
    }, [currentCourse]);

    return (
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
              handleUpdateCourse(
                courseId,
                title,
                description,
                price,
                imageLink
              );
            }}
          >
            Update Course
          </button>
        </form>
      </div>
    );
  }
}

export default Course;

// const titleState = atom({
//   key: "titleState",
//   default: "",
// });
// const descriptionState = atom({
//   key: "descriptionState",
//   default: "",
// });
// const imageState = atom({
//   key: "imageState",
//   default: "",
// });

// const priceState = atom({
//   key: "priceState",
//   default: "",
// });

// const currentCourseState = atom({
//   key: "currentCourseState",
//   default: {},
// });
