import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom'

export default function Studentwiselesson() {
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const location = useLocation();
  const { batchname, branchname, email } = location.state || {};

  const fetchLessons = (pg = 1) => {
    if (batchname && branchname && email) {
      axios
        .get("https://codebackend-t492.onrender.com/stulessons", {
          params: { batchname, branchname, email, page: pg, limit: 5 },
          withCredentials: true,
        })
        .then((res) => {
          setLessons(res.data.lessons || []);
          setPages(res.data.pages || 1);
          setPage(res.data.page || 1);
        })
        .catch((err) => {
          console.error(err);
          alert("Error fetching lessons");
        });
    }
  };

  useEffect(() => {
    fetchLessons(page);
  }, [batchname, branchname, email, page]);

  const handlePrev = () => {
    if (page > 1) fetchLessons(page - 1);
  };

  const handleNext = () => {
    if (page < pages) fetchLessons(page + 1);
  };

  return (
    <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Class Code</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <Link to='/' class="nav-link active">Home</Link>
        </li>
        <li class="nav-item">
         <Link to='/' class="nav-link">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet></Outlet>
 <div className="container mt-5">
      <h3 className="mb-4">My Lessons</h3>
      {lessons.length > 0 ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Topic</th>
                <th>Class Type</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, idx) => (
                <tr key={idx}>
                  <td>{new Date(lesson.createddate).toLocaleDateString()}</td>
                  <td>{lesson.topicname}</td>
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

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" disabled={page <= 1} onClick={handlePrev}>
              Previous
            </button>
            <span>Page {page} of {pages}</span>
            <button className="btn btn-secondary" disabled={page >= pages} onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No lessons found</p>
      )}
    </div>
</>
   
  );
}
