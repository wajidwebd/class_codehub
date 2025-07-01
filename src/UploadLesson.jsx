import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function UploadLesson() {
  const [branchname, setBranchname] = useState("");
  const [batchname, setBatchname] = useState("");
  const [studentsname, setStudentsname] = useState("");
  const [createddate, setCreateddate] = useState("");
  const [topicname, setTopicname] = useState("");
  const [filenames, setFilenames] = useState([]);
  const [classtype, setClasstype] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://codebackend-t492.onrender.com/get-batches").then((res) => {
      setBatchOptions(res.data);
    });
  }, []);

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("batchname", batchname);
    formData.append("branchname", branchname);
    formData.append("createddate", createddate);
    formData.append("topicname", topicname);
    formData.append("classtype", classtype); // ✅ Only append once

    // Append each student name individually
    studentsname.split(",").forEach(name => {
      if (name.trim()) {
        console.log(name);        
        formData.append("studentsname", name.trim().toLowerCase());
      }
    });

    filenames.forEach((file) => {
      formData.append("filenames", file);
    });

    axios.post("https://codebackend-t492.onrender.com/upload-lesson", formData)
      .then(() => {
        alert("Lesson Uploaded");
        navigate('/viewlesson');
      })
      .catch((err) => {
        console.error("Error uploading lesson:", err);
        alert("Failed to upload lesson");
      });
  };

  const handleBatchChange = (e) => {
    const selectedBatch = batchOptions.find(batch => batch.batchname === e.target.value);
    setBatchname(e.target.value);
    if (selectedBatch) setBranchname(selectedBatch.branchname);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Create Lesson</h3>
                <form onSubmit={handleLessonSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Student Names</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter student names (comma separated)"
                      value={studentsname}
                      onChange={(e) => setStudentsname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Batch</label>
                    <select className="form-select" onChange={handleBatchChange} required>
                      <option value="">Select Batch</option>
                      {batchOptions.map((batch, idx) => (
                        <option key={idx} value={batch.batchname}>
                          {batch.batchname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={createddate}
                      onChange={(e) => setCreateddate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Topic Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Topic Name"
                      value={topicname}
                      onChange={(e) => setTopicname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Upload File (.txt)</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={(e) => setFilenames([...e.target.files])}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Class Type</label>
                    <select
                      className="form-select"
                      value={classtype}
                      onChange={(e) => setClasstype(e.target.value)}
                      required
                    >
                      <option value="">Select Class Type</option>
                      <option value="Masterclass">Masterclass</option>
                      <option value="Class">Class</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    Submit Lesson
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
