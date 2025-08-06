import React, { useRef } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Filter,
  ExcelExport,
  PdfExport,
  Toolbar,
  Print,
  Page,
  Search,
  Inject,
} from "@syncfusion/ej2-react-grids";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const sampleCourses = [
  {
    id: 1,
    name: "Full Stack Development",
    description: "Frontend and backend web dev.",
    duration: "6 months",
    startDate: "2025-08-10",
    endDate: "2026-02-10",
    courseFees: 45000.0,
    maxStudents: 30,
    status: true,
    subjects: [
      {
        code: 101,
        name: "HTML",
        description: "Basics of HTML",
        status: true,
        teacher: "Mr. Sharma",
      },
      {
        code: 102,
        name: "React",
        description: "Frontend using React",
        status: false,
        teacher: "Ms. Verma",
      },
    ],
  },
  {
    id: 2,
    name: "Data Science",
    description: "Python, ML, Visualization.",
    duration: "4 months",
    startDate: "2025-09-01",
    endDate: "2026-01-01",
    courseFees: 60000.0,
    maxStudents: 25,
    status: false,
    subjects: [
      {
        code: 201,
        name: "Python",
        description: "Python basics",
        status: true,
        teacher: "Dr. Gupta",
      },
      {
        code: 202,
        name: "ML",
        description: "Intro to ML",
        status: true,
        teacher: "Mr. Bose",
      },
    ],
  },
];

function TeacherDisplayCourse() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const handleViewSubjects = (course) => {
    navigate(`/teacher/course/${course.id}/subjects`);
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
              <h3 className="fw-bold" style={{ color: "#4361e5" }}>
                Course List
              </h3>
              <GridComponent
                ref={gridRef}
                dataSource={sampleCourses}
                allowSorting={true}
                allowPaging={true}
                allowExcelExport={true}
                allowPdfExport={true}
                allowTextWrap={true}
                textWrapSettings={{ wrapMode: "Content" }}
                pageSettings={{ pageSize: 6 }}
                toolbar={["Search", "ExcelExport", "PdfExport", "Print"]}
                toolbarClick={(args) => {
                  if (args.item.id.includes("pdfexport"))
                    gridRef.current.pdfExport();
                  if (args.item.id.includes("excelexport"))
                    gridRef.current.excelExport();
                  if (args.item.id.includes("print")) gridRef.current.print();
                }}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="name"
                    headerText="Course Name"
                    width="120"
                    clipMode="EllipsisWithTooltip"
                  />
                  <ColumnDirective
                    field="description"
                    headerText="Description"
                    width="150"
                    clipMode="EllipsisWithTooltip"
                  />
                  <ColumnDirective
                    field="duration"
                    headerText="Duration"
                    width="90"
                  />
                  <ColumnDirective
                    field="startDate"
                    headerText="Start Date"
                    width="100"
                  />
                  <ColumnDirective
                    field="endDate"
                    headerText="End Date"
                    width="100"
                  />
                  <ColumnDirective
                    field="courseFees"
                    headerText="Fees"
                    width="90"
                  />
                  <ColumnDirective
                    field="maxStudents"
                    headerText="Max Students"
                    width="110"
                  />
                  <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="90"
                    template={(props) => (
                      <span
                        className={`badge ${
                          props.status ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {props.status ? "Active" : "Inactive"}
                      </span>
                    )}
                  />
                  <ColumnDirective
                    headerText="Action"
                    width="120"
                    template={(props) => (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewSubjects({ id: props.id })}
                      >
                        View Subjects
                      </button>
                    )}
                  />
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TeacherDisplayCourse;
