import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Adminhome() {




  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Admin home</h2>
   
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
