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
import Navbar from "../../components/Navbar";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";

// Dummy teacher data
const sampleTeachers = [
  {
    id: 1,
    name: "Dr. Aisha Khan",
    email: "aisha.khan@example.com",
    phoneNumber: "9876543210",
    address: "123 Park Street, Mumbai",
    joiningDate: "2022-06-15",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Mr. Rohan Desai",
    email: "rohan.desai@example.com",
    phoneNumber: "8765432109",
    address: "456 Main Road, Pune",
    joiningDate: "2021-08-25",
    status: "INACTIVE",
  },
  {
    id: 3,
    name: "Mrs. Neha Sharma",
    email: "neha.sharma@example.com",
    phoneNumber: "9988776655",
    address: "22 MG Road, Bangalore",
    joiningDate: "2023-01-10",
    status: "ACTIVE",
  },
];

function TeacherDisplayCourse() {
  const gridRef = useRef(null);

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
                Teacher List
              </h3>
              <GridComponent
                ref={gridRef}
                dataSource={sampleTeachers}
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
                  <ColumnDirective field="name" headerText="Name" width="150" />
                  <ColumnDirective
                    field="email"
                    headerText="Email"
                    width="200"
                  />
                  <ColumnDirective
                    field="phoneNumber"
                    headerText="Phone"
                    width="120"
                  />
                  <ColumnDirective
                    field="address"
                    headerText="Address"
                    width="220"
                  />
                  <ColumnDirective
                    field="joiningDate"
                    headerText="Joining Date"
                    width="120"
                  />
                  <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="100"
                    textAlign="Center"
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

export default TeacherDisplayCourse;
