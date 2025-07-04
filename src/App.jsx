import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Viewlesson from "./adminpanel/Viewlesson";
import CreateBatch from "./adminpanel/CreateBatch";
import UploadLesson from "./adminpanel/UploadLesson";
import Login from "./studentpanel/Login";
import Signup from "./adminpanel/Signup";
import Studentwiselesson from "./studentpanel/Studentwiselesson";
import { Studentnavbar } from "./studentpanel/Studentnavbar";
import { StudentHome } from "./studentpanel/StudentHome";
import { Adminlogin } from "./adminpanel/Adminlogin";
import Adminhome from "./adminpanel/Adminhome";

 
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
