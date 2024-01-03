import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleAddCourse = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          imageLink,
          published: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert("Course added successfully");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageLink("");
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <div className="w-full h-screen bg-[#0F172A] flex justify-center items-center ">
   <form
          action=""
          className="p-6  w-96 bg-white"
          style={{ boxShadow: "0 0 30px 5px rgba(0,0,0,0.1)" }}
        >
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
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
        onClick={handleAddCourse}
      >
        Add Course
      </button>
    </form>
    </div>
  );
}

export default AddCourse;
