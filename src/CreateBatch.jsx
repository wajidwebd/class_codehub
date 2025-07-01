import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function CreateBatch() {
  const [branchname, setBranchname] = useState("");
  const [batchname, setBatchname] = useState("");
  const navigate = useNavigate();


  const handleCreateBranch = (e) => {
    e.preventDefault();
    axios.post("https://codebackend-t492.onrender.com/create-branch", { branchname, batchname }).then(() => {
      alert("Branch & Batch Created");
      setBranchname('')
      setBatchname('')
      navigate('/uploadlesson')

    });
  };




  return (
    <>
      <Navbar></Navbar>
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create Branch & Batch</h2>
              <form onSubmit={handleCreateBranch}>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">Branch Name</label>
                  <input
                    type="text"
                    id="branch"
                    className="form-control"
                    placeholder="Enter Branch Name"
                    value={branchname}
                    onChange={(e) => setBranchname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="batch" className="form-label">Batch Name</label>
                  <input
                    type="text"
                    id="batch"
                    className="form-control"
                    placeholder="Enter Batch Name"
                    value={batchname}
                    onChange={(e) => setBatchname(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
