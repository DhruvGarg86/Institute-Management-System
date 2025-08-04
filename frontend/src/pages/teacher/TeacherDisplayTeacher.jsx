import React, { useEffect, useState } from "react";
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import Footer from "../../components/Footer";

function TeacherDisplayTeacher() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Dummy data simulating TeacherDisplayTeacherDTO structure
    const dummyTeachers = [
      {
        id: 1,
        name: "Dr. Aisha Khan",
        phoneNumber: "9876543210",
        address: "123 Park Street, Mumbai",
        email: "aisha.khan@example.com",
        joiningDate: "2022-06-15",
        status: "ACTIVE",
        image: "https://i.pravatar.cc/100?img=12",
        subjects: [
          { id: 1, name: "Mathematics", code: "MATH101" },
          { id: 2, name: "Statistics", code: "STAT202" },
        ],
      },
      {
        id: 2,
        name: "Mr. Rohan Desai",
        phoneNumber: "8765432109",
        address: "456 Main Road, Pune",
        email: "rohan.desai@example.com",
        joiningDate: "2021-08-25",
        status: "INACTIVE",
        image: "https://i.pravatar.cc/100?img=14",
        subjects: [
          { id: 3, name: "Java Programming", code: "JAVA101" },
          { id: 4, name: "Spring Boot", code: "SPR202" },
        ],
      },
    ];

    setTeachers(dummyTeachers); // Set dummy data
  }, []);

  return (
    <>
      <TeacherNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <TeacherSidebar />
          </div>
          <div className="col-10 p-4">
            <h2 className="mb-4">Teachers List</h2>
            <div className="row">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="col-md-6 mb-4">
                  <div className="card shadow-sm p-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="rounded-circle me-3"
                        width="70"
                        height="70"
                      />
                      <div>
                        <h5>{teacher.name}</h5>
                        <p className="mb-1"><strong>Email:</strong> {teacher.email}</p>
                        <p className="mb-1"><strong>Phone:</strong> {teacher.phoneNumber}</p>
                        <p className="mb-1"><strong>Status:</strong> {teacher.status}</p>
                        <p className="mb-1"><strong>Joined:</strong> {teacher.joiningDate}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h6>Subjects:</h6>
                      <ul>
                        {teacher.subjects.map((subject) => (
                          <li key={subject.id}>
                            {subject.name} ({subject.code})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {teachers.length === 0 && (
                <p className="text-muted text-center">No teacher data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TeacherDisplayTeacher;
