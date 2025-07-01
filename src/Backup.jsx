import React, { useEffect, useState } from "react";
import axios from "axios";
import Viewlesson from "./Viewlesson";

export default function UploadLesson() {
  const [branchname, setBranchname] = useState("");
  const [batchname, setBatchname] = useState("");
  const [studentsname, setStudentsname] = useState("");
  const [createddate, setCreateddate] = useState("");
  const [topicname, setTopicname] = useState("");
  const [filename, setFilename] = useState(null);
  const [classtype, setClasstype] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    axios.get("https://codebackend-t492.onrender.com/get-batches").then((res) => {
      setBatchOptions(res.data);
    });
  }, []);

  const handleCreateBranch = (e) => {
    e.preventDefault();
    axios.post("https://codebackend-t492.onrender.com/create-branch", { branchname, batchname }).then(() => {
      alert("Branch & Batch Created");
    });
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentsname", studentsname);
    formData.append("batchname", batchname);
    formData.append("branchname", branchname);
    formData.append("createddate", createddate);
    formData.append("topicname", topicname);
    formData.append("filename", filename);
    formData.append("classtype", classtype);

    axios.post("https://codebackend-t492.onrender.com/upload-lesson", formData).then(() => {
      alert("Lesson Uploaded");
    });
  };

  const handleBatchChange = (e) => {
    const selectedBatch = batchOptions.find(batch => batch.batchname === e.target.value);
    setBatchname(e.target.value);
    if (selectedBatch) setBranchname(selectedBatch.branchname);
  };

  return (
    <>
      <h2>Create Branch & Batch</h2>
      <form onSubmit={handleCreateBranch}>
        <input type="text" placeholder="Enter Branch Name" onChange={(e) => setBranchname(e.target.value)} required />
        <input type="text" placeholder="Enter Batch Name" onChange={(e) => setBatchname(e.target.value)} required />
        <button type="submit">Create</button>
      </form>

      <h2>Upload Lesson Details</h2>
      <form onSubmit={handleLessonSubmit}>
        <input
          type="text"
          placeholder="Enter student names (comma separated)"
          onChange={(e) => setStudentsname(e.target.value)}
          required
        />

        <select onChange={handleBatchChange} required>
          <option value="">Select Batch</option>
          {batchOptions.map((batch, idx) => (
            <option key={idx} value={batch.batchname}>
              {batch.batchname}
            </option>
          ))}
        </select>

        <input type="date" onChange={(e) => setCreateddate(e.target.value)} required />
        <input type="text" placeholder="Enter Topic Name" onChange={(e) => setTopicname(e.target.value)} required />
        <input type="file" accept=".txt" onChange={(e) => setFilename(e.target.files[0])} required />

        <select onChange={(e) => setClasstype(e.target.value)} required>
          <option value="">Select Class Type</option>
          <option value="Masterclass">Masterclass</option>
          <option value="Class">Class</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      <Viewlesson></Viewlesson>
    </>
  );
}
