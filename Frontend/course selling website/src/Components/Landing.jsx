import codingPhoto from "../assets/codingP.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className=" font-serif overflow-hidden">
      <div
        className="h-screen w-full flex flex-col-reverse lg:flex-row  justify-between items-center "
        style={{
          backgroundColor: "#EDEDED",
        }}
      >
        <div
          className=" lg:ml-20 lg:w-96"
          style={{
            color: "#2D2F31",
          }}
        >
          <h1 className="text-6xl font-bold font-serif ">Come teach with us</h1>
          <h3 className="text-2xl">
            Become an instructor and change lives — including your own
          </h3>
          <button
            className="bg-customColor hover:bg-customColorHover hover:scale-105 transition-all duration-500 ease-out text-white font-bold py-4 w-full my-8 text-xl"
            style={{
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
              //   backgroundColor:"#2D2F31"
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/Signup");
            }}
          >
            Get Started
          </button>
        </div>
        <div className="lg:mr-20 grayscale">
          <img src={codingPhoto} alt="errorrroro" width={900} />
        </div>
      </div>

      <div className="flex items-center flex-col  mt-24 ">
        <h1 className="text-6xl font-bold font-serif">
          So many reasons to start
        </h1>
        <div className="flex lg:first-letter:mt-20 flex-col justify-center  lg:flex-row">
          {reasons.map((reason) => {
            return (
              <div className="w-96  flex items-center flex-col lg:mr-28 mt-20 lg:mt-0">
                <img src={reason.image} alt="" />
                <p className="text-2xl font-bold">{reason.title}</p>
                <p className="text-xl">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-full bg-purple-500 text-white lg:h-60 h-full mt-32 flex justify-center ">
        <div className="w-4/5 flex justify-center items-center lg:justify-between text-2xl flex-wrap">
          <div className="flex flex-col items-center p-10">
            <p className="text-7xl font-bold ">6M</p>
            <p>Students</p>
          </div>
          <div className="flex flex-col items-center p-10">
            <p className="text-7xl font-bold ">50+</p>
            <p>Languages</p>
          </div>
          <div className="flex flex-col items-center p-10">
            <p className="text-7xl font-bold ">60M</p>
            <p>Enrollments</p>
          </div>
          <div className="flex flex-col items-center p-10">
            <p className="text-7xl font-bold ">110+</p>
            <p>Countries</p>
          </div>
         
        </div>
      </div>

      <div className="flex flex-col items-center py-32 lg:p-32 bg-bgcolor">
        <p className="text-5xl font-bold font-serif mb-6 text-center ">
          Become an instructor today
        </p>
        <p
          className="text-3xl mb-6 pl-10 text-center"
          style={{
            width: "700px",
          }}
        >
          Join one of the world’s largest online learning marketplaces.
        </p>
        <button
          className="bg-customColor hover:bg-customColorHover  text-white font-bold py-4 w-96 my-8 text-xl"
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
            //   backgroundColor:"#2D2F31"
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/Signup");
          }}
        >
          Get Started
        </button>
      </div>

      <footer className="bg-gray-800 text-white p-20">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-2xl">
              Copyright © 2024 Sorting Code Help Technologies Pvt Ltd. All
              Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const reasons = [
  {
    title: "Teach your way",
    description:
      "Publish the course you want, in the way you want, and always have control of your own content.",
    image: "https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg",
  },
  {
    title: "Inspire",
    description:
      "Create courses on topics you’re passionate about and help others learn new skills.",
    image: "https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg",
  },
  {
    title: "Get rewarded",
    description:
      "Earn money every time a student purchases your course. Get paid monthly through PayPal or Payoneer.",
    image: "https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg",
  },
];

export default Landing;
