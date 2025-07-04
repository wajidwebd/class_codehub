import React from 'react'
import { Studentnavbar } from './Studentnavbar'

export const StudentHome = () => {
  return (
    <div>
        <Studentnavbar></Studentnavbar>
    <div className="d-flex flex-column min-vh-100">
      {/* Hero Section */}
      <section className="container-fluid bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Learn Digital Skills <br /> That Shape Your Future
              </h1>
              <p className="lead mt-3">
                Get trained by industry experts in UI/UX, Web Development, Graphic Design, and more.
              </p>
              <a href="#courses" className="btn btn-warning  mt-4">
                View Courses
              </a>
            </div>
            <div className="col-md-6 mt-4 mt-md-0 text-end">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/male-and-female-developer-doing-discussion-coding-illustration-download-in-svg-png-gif-file-formats--software-programmer-working-pack-people-illustrations-3940008.png"
                alt="hero"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light" id="courses">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Popular Courses</h2>
          <div className="row g-4">
            {[
              {
                title: "UI/UX Design",
                desc: "Master user-centered design and prototyping using Figma and Adobe XD.",
              },
              {
                title: "Web Development",
                desc: "Learn HTML, CSS, JavaScript, React, Node.js and build full-stack apps.",
              },
              {
                title: "Graphic Design",
                desc: "Explore design principles and tools like Photoshop & Illustrator.",
              },
            ].map((course, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{course.title}</h5>
                    <p className="card-text">{course.desc}</p>
                    <a href="#" className="btn btn-outline-primary mt-3">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-warning py-5 text-center text-dark">
        <div className="container">
          <h3 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h3>
          <a href="#contact" className="btn btn-dark ">
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} Class Codehub</p>
          <p className="mb-0">
            <small>
              Designed for modern learners. Connect with us on
              <a href="#" className="text-warning ms-2">Instagram</a>,
              <a href="#" className="text-warning ms-2">Facebook</a>,
              <a href="#" className="text-warning ms-2">YouTube</a>
            </small>
          </p>
        </div>
      </footer>
    </div>
    </div>
  )
}
