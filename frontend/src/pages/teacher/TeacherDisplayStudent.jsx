import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import { getAllStudents, getUserIdFromToken } from "../../services/Teacher/Student";
import { toast } from "react-toastify";

function TeacherDisplayStudent() {

  const id = getUserIdFromToken();
  console.log("DIPSLAY STUDENT: " + id)

 const navigate = useNavigate();
    const gridRef = useRef(null);

    const [students, setStudents] = useState([]);

    const getStudents = async (id) => {
        try{
            
            const response = await getAllStudents(id);
            
            setStudents(response);
            toast.success("Students loaded successfully");
        }catch(error){
            console.log(error);
            toast.error("Unable to load students");
        }
    }

    useEffect(() => {
        getStudents(id);
    }, [id])

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
                Student List
              </h3>
              <GridComponent
                ref={gridRef}
                dataSource={students}
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
                    field="avatar"
                    headerText="Profile"
                    width="60"
                    template={(props) => (
                      <img
                        src={props.avatar}
                        alt="avatar"
                        style={{
                          borderRadius: "50%",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  />
                  <ColumnDirective
                    field="name"
                    headerText="Name"
                    textAlign="Center"
                    width="85"
                  />
                  <ColumnDirective
                    field="id"
                    headerText="Roll"
                    textAlign="Center"
                    width="50"
                  />
                  <ColumnDirective
                    field="address"
                    headerText="Address"
                    width="150"
                  />
                  <ColumnDirective
                    field="dob"
                    headerText="DOB"
                    textAlign="Center"
                    width="75"
                  />
                  <ColumnDirective
                    field="phoneNumber"
                    headerText="Phone"
                    width="95"
                  />
                  <ColumnDirective
                    headerText="Action"
                    width="135"
                    template={(props) => (
                      <div>
                        <button
                          className="btn btn-sm btn-light text-primary me-2"
                          onClick={() =>
                            navigate(`/teacher/students/marks/${props.id}`)
                          }
                        >
                          View Marks
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

export default TeacherDisplayStudent;
