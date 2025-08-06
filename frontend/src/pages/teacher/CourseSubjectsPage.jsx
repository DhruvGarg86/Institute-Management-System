// src/pages/teacher/CourseSubjectsPage.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Sort,
  Filter,
  ExcelExport,
  PdfExport,
  Toolbar,
  Print,
  Page,
  Search,
} from "@syncfusion/ej2-react-grids";

function CourseSubjectsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

//   const statusTemplate = (props) => {
//     return (
//       <span
//         className={`badge ${
//           props.status === true ? "bg-success" : "bg-danger"
//         }`}
//       >
//         {props.status}
//       </span>
//     );
//   };

  // Dummy course and subjects data
  const course = {
    id: courseId,
    name: courseId === "1" ? "Frontend Development" : "AI/ML Basics",
    subjects:
      courseId === "1"
        ? [
            {
              code: 101,
              name: "HTML",
              description: "Basics of HTML",
              teachers: ["Alice", "Bob"],
            //   status: true,
            },
            {
              code: 102,
              name: "React",
              description: "Frontend with React",
              teachers: ["Charlie"],
            //   status: false,
            },
          ]
        : [
            {
              code: 201,
              name: "Python",
              description: "Python Basics",
              teachers: ["Dave", "Eve"],
            //   status: true,
            },
            {
              code: 202,
              name: "ML",
              description: "Intro to ML",
              teachers: ["Frank"],
            //   status: false,
            },
          ],
  };

  return (
    <>
      <TeacherNavbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <TeacherSidebar />
          </div>
          <div className="col-7-5 admin-dashboard-second p-4">
            <div className="card p-4 shadow">
              <h3 className="fw-bold text-primary mb-3">
                Subjects for: {course.name}
              </h3>

              <GridComponent
                dataSource={course.subjects}
                allowPaging={true}
                allowSorting={true}
                // allowFiltering={true}
                allowExcelExport={true}
                allowPdfExport={true}
                toolbar={["Search", "ExcelExport", "PdfExport", "Print"]}
                pageSettings={{ pageSize: 7 }}
              >
                <ColumnsDirective>
                  <ColumnDirective field="code" headerText="Code" width="100" />
                  <ColumnDirective
                    field="name"
                    headerText="Subject Name"
                    width="150"
                  />
                  <ColumnDirective
                    field="description"
                    headerText="Description"
                    width="200"
                  />
                  <ColumnDirective
                    field="teachers"
                    headerText="Teachers"
                    width="200"
                    template={(props) => props.teachers.join(", ")}
                  />
                  {/* <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="100"
                    template={statusTemplate}
                  /> */}
                </ColumnsDirective>
                <Inject
                  services={[
                    Sort,
                    Filter,
                    ExcelExport,
                    PdfExport,
                    Toolbar,
                    Print,
                    Page,
                    Search,
                  ]}
                />
              </GridComponent>

              <button
                className="btn btn-secondary mt-4"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseSubjectsPage;
