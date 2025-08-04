import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
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
import { FaEdit, FaTrash } from "react-icons/fa";

// Dummy course data
const sampleCourses = [
  {
    id: 1,
    name: "Full Stack Development",
    description: "Learn frontend and backend web development.",
    duration: "6 months",
    startDate: "2025-08-10",
    endDate: "2026-02-10",
    courseFees: 45000.0,
    maxStudents: 30,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Data Science",
    description: "Explore Python, ML, and Data Visualization.",
    duration: "4 months",
    startDate: "2025-09-01",
    endDate: "2026-01-01",
    courseFees: 60000.0,
    maxStudents: 25,
    status: "INACTIVE",
  },
  {
    id: 3,
    name: "Cloud Computing",
    description: "AWS, Azure and DevOps foundations.",
    duration: "3 months",
    startDate: "2025-10-15",
    endDate: "2026-01-15",
    courseFees: 55000.0,
    maxStudents: 20,
    status: "ACTIVE",
  },
];

function DisplayCourse() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <Sidebar />
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
                allowExcelExport={true}
                allowPdfExport={true}
                allowPaging={true}
                pageSettings={{ pageSize: 7 }}
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
                  />
                  <ColumnDirective
                    field="description"
                    headerText="Description"
                    width="180"
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
                    headerText="Fees (₹)"
                    width="90"
                    format="C2"
                    textAlign="Right"
                  />
                  <ColumnDirective
                    field="maxStudents"
                    headerText="Max Students"
                    width="110"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="90"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Action"
                    width="135"
                    template={(props) => (
                      <div>
                        <button
                          className="btn btn-sm btn-light me-2 text-primary"
                          onClick={() =>
                            navigate(`/admin/edit-course/${props.id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-light text-danger"
                          onClick={() =>
                            console.log("Delete course:", props.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
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
    </>
  );
}

export default DisplayCourse;
