import AddCourse from './Components/AddCourse.jsx';
import Appbar from './Components/Appbar.jsx';
import ShowCourses from './Components/ShowCourses.jsx';
import Signin from './Components/Signin.jsx';
import Signup from './Components/Signup.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        {/* Appbar is outside the Routes, ensuring it's present on all routes */}
        <Appbar />

        {/* Routes for different components */}
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/showcourses" element={<ShowCourses />} />

          {/* <Route path="/courses" element={<ShowCourses />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
