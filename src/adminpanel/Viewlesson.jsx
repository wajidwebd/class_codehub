import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";

export default function Viewlesson() {
  const [branchname, setBranchname] = useState("");
  const [batchname, setBatchname] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    // Load all batch options
    axios.get("https://codebackend-t492.onrender.com/get-batches").then((res) => {
      setBatchOptions(res.data);
    });

    // Load initial 5 lessons (no filters)
    fetchLessons(1);
  }, []);

  const fetchLessons = (pageNum = 1, useFilters = false) => {
    const params = {
      page: pageNum,
      limit,
    };

    if (useFilters) {
      if (branchname) params.branchname = branchname;
      if (batchname) params.batchname = batchname;
    }

    axios.get("https://codebackend-t492.onrender.com/lessons", { params }).then((res) => {
      setFilteredLessons(res.data.lessons);
      setTotalPages(res.data.pages);
      setPage(res.data.page);
    });
  };

  const handleSearch = () => {
    fetchLessons(1, true);
  };

  const handlePageChange = (newPage) => {
    fetchLessons(newPage, branchname || batchname);
  };

  const uniqueBranches = [...new Set(batchOptions.map((b) => b.branchname))];
  const filteredBatches = batchOptions.filter((b) => b.branchname === branchname);

  return (
    <>
    <Navbar></Navbar>
    <div className="container py-5">
      <div className="card shadow rounded-4 p-4">
        <h2 className="mb-4 text-center">View Lessons</h2>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Select Branch</label>
            <select
              className="form-select"
              value={branchname}
              onChange={(e) => setBranchname(e.target.value)}
            >
              <option value="">Select Branch</option>
              {uniqueBranches.map((branch, idx) => (
                <option key={idx} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Select Batch</label>
            <select
              className="form-select"
              value={batchname}
              onChange={(e) => setBatchname(e.target.value)}
            >
              <option value="">Select Batch</option>
              {filteredBatches.map((batch, idx) => (
                <option key={idx} value={batch.batchname}>
                  {batch.batchname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-grid mb-4">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        <hr />

        {filteredLessons.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Students</th>
                    <th>Class Type</th>
                    <th>Files</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.map((lesson, idx) => (
                    <tr key={idx}>
                      <td>{new Date(lesson.createddate).toLocaleDateString()}</td>
                      <td>{lesson.topicname}</td>
                      <td>{lesson.studentsname.join(", ")}</td>
                      <td>{lesson.classtype}</td>
                      <td>
                        {Array.isArray(lesson.filenames) && lesson.filenames.length > 0 ? (
                          lesson.filenames.map((file, i) => (
                            <div key={i}>
                              <a
                                href={`https://codebackend-t492.onrender.com/uploads/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="btn btn-sm btn-outline-primary me-2 mb-1"
                              >
                                {file}
                              </a>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted">No file</span>
                        )}
                      </td>



                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${page === idx + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        ) : (
          <p className="text-center text-muted">No lessons found.</p>
        )}
      </div>
    </div>
    </>
    
  );
}
