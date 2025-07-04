import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Studentnavbar } from "../studentpanel/Studentnavbar";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    batchname: "",
    branchname: "",
  });

  const [batchOptions, setBatchOptions] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch branch & batch options on load
  useEffect(() => {
    axios.get("https://codebackend-t492.onrender.com/get-batches").then((res) => {
      setBatchOptions(res.data);
    });
  }, []);

  // 2. Unique branch list
  const uniqueBranches = [
    ...new Set(batchOptions.map((b) => b.branchname)),
  ];

  // 3. Filter batches for selected branch
  const filteredBatches = batchOptions.filter(
    (b) =>
      b.branchname ===
      form.branchname
  );

  // 4. Fetch students when branchname and batchname are valid
  useEffect(() => {
    const branch = form.branchname;
    const batch = form.batchname;

    if (branch && batch) {
      setLoadingStudents(true);
      axios
        .get("https://codebackend-t492.onrender.com/students-by-branch-batch", {
          params: {
            branchname: branch,
            batchname: batch,
          },
        })
          .then((res) => {
            console.log("Student API result:", res.data);
            const uniqueStudents = Array.from(new Set(
              res.data.map(student => student.name.trim().toLowerCase())
            )).map(name => {
              return res.data.find(student => student.name.trim().toLowerCase() === name);
            });

            setStudentList(uniqueStudents || []);
          })

        .catch((err) => {
          console.error("Error fetching students:", err);
          setStudentList([]);
        })
        .finally(() => {
          setLoadingStudents(false);
        });
    } else {
      setStudentList([]);
    }
  }, [form.branchname, form.batchname]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://codebackend-t492.onrender.com/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
    <Studentnavbar></Studentnavbar>
        <div className="container mt-5">
      <h3 className="mb-4">Student Signup</h3>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="form-select mb-3"
          value={form.branchname}
          onChange={(e) =>
            setForm({
              ...form,
              branchname: e.target.value,
              batchname: "",
              name: "",
            })
          }
          required
        >
          <option value="">Select Branch</option>
          {uniqueBranches.map((branch, idx) => (
            <option key={idx} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <select
          className="form-select mb-3"
          value={form.batchname}
          onChange={(e) =>
            setForm({ ...form, batchname: e.target.value, name: "" })
          }
          required
        >
          <option value="">Select Batch</option>
          {filteredBatches.map((b, idx) => (
            <option key={idx} value={b.batchname}>
              {b.batchname}
            </option>
          ))}
        </select>

        <select
          className="form-select mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        >
          <option value="">Select Your Name</option>
          {loadingStudents ? (
            <option>Loading...</option>
          ) : studentList.length > 0 ? (
            studentList.map((student, idx) => (
              <option key={idx} value={student.name}>
                {student.name}
              </option>
            ))
          ) : (
            <option disabled>No students found</option>
          )}
        </select>

        <button type="submit" className="btn btn-success w-100">
          Signup
        </button>
      </form>
    </div>
      
    </>

  );
}

export default Signup;
