import AddCourse from "./Components/AddCourse.jsx";
import Appbar from "./Components/Appbar.jsx";
import Course from "./Components/Course.jsx";
import ShowCourses from "./Components/ShowCourses.jsx";
import Signin from "./Components/Signin.jsx";
import Signup from "./Components/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Appbar />

          <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/showcourses" element={<ShowCourses />} />
            <Route path="/courses/:courseId" element={<Course />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
