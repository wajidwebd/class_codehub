import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Viewlesson from "./Viewlesson";
import CreateBatch from "./CreateBatch";
import UploadLesson from "./UploadLesson";
import Login from "./Login";
import Signup from "./Signup";
import Studentwiselesson from "./Studentwiselesson";
import { Studentnavbar } from "./Studentnavbar";
import { StudentHome } from "./StudentHome";
import { Adminlogin } from "./Adminlogin";
import Adminhome from "./Adminhome";
 
export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<StudentHome></StudentHome>}></Route>
          <Route path="/adminlogin" element={<Adminlogin></Adminlogin>}></Route>
          <Route path="/adminhome" element={<Adminhome></Adminhome>}></Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/studentlessons" element={<Studentwiselesson></Studentwiselesson>}></Route>
         <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/createbatch" element={<CreateBatch></CreateBatch>}></Route>
          <Route path="/uploadlesson" element={<UploadLesson></UploadLesson>}></Route>
          <Route path="/viewlesson" element={<Viewlesson></Viewlesson>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
