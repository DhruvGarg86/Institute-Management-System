import React, { useEffect, useRef, useState } from "react";
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
import { deleteStudentById, getAllStudents } from "../../services/Admin/Student";
import { toast } from "react-toastify";



function DisplayStudent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const gridRef = useRef(null);

  const getStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, [])

  const deleteStudent = async (id) => {
    try {
      await deleteStudentById(id);
      toast.success("Student deleted successfully");
      getStudents();
    } catch (error) {
      // console.log(error);
      toast.error("Unable to delete student");
    }
  };

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
                Student List
              </h3>
              <GridComponent
                ref={gridRef}
                dataSource={students}
                allowSorting={true}
                allowExcelExport={true}
                allowPdfExport={true}
                allowPaging={true}
                // allowFiltering={true}
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
                  <ColumnDirective field="image"  headerText="Profile" width="60" allowSorting={false}
                    template={(props) => (
                      <img
                        src={props.image}
                        alt="avatar"
                        style={{
                          borderRadius: "50%",
                          height: "40px",
                          objectFit: "cover",
                          width: "40px",
                        }}
                      />
                    )}
                  />
                  <ColumnDirective field="name" headerText="Name" textAlign="Center" width="85" />
                  <ColumnDirective field="id" headerText="Roll" textAlign="Center" width="50" />
                  <ColumnDirective field="address" headerText="Address" width="160" />
                  <ColumnDirective field="courseName" headerText="course" textAlign="Center" width="60" />
                  <ColumnDirective field="dob" headerText="DOB" textAlign="Center" width="75" />
                  <ColumnDirective field="phoneNumber" headerText="Phone" width="75" />
                  <ColumnDirective headerText="Action" width="135"
                    template={(props) => {
                      return (
                        <div>
                          <button
                            className="btn btn-sm btn-light text-primary me-2"
                            onClick={() =>
                              navigate(`/admin/add-student-marks/${props.id}`)
                            }
                          >
                            Add Marks
                          </button>
                          <button
                            className="btn btn-sm btn-light me-2"
                            onClick={() =>
                              navigate(`/admin/edit-student/${props.id}`)
                            }
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-light text-danger"
                            onClick={() => deleteStudent(props.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      );
                    }}
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

export default DisplayStudent;
