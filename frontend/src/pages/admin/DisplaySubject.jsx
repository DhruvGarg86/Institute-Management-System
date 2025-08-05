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

// Updated dummy data as per SubjectDto
const sampleSubjects = [
  {
    code: "SUB101",
    name: "Mathematics",
    description: "Basic Algebra and Calculus",
    status: "ACTIVE",
  },
  {
    code: "SUB102",
    name: "Physics",
    description: "Mechanics and Thermodynamics",
    status: "ACTIVE",
  },
  {
    code: "SUB103",
    name: "English Literature",
    description: "Poetry and Prose Analysis",
    status: "INACTIVE",
  },
];

function DisplaySubject() {
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
                Subject List
              </h3>
              <GridComponent
                ref={gridRef}
                dataSource={sampleSubjects}
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
                  <ColumnDirective field="code" headerText="Code" width="100" />
                  <ColumnDirective field="name" headerText="Name" width="150" />
                  <ColumnDirective
                    field="description"
                    headerText="Description"
                    width="250"
                  />
                  <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="100"
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
                            navigate(`/admin/edit-subject/${props.code}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-light text-danger"
                          onClick={() =>
                            console.log("Delete subject:", props.code)
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

export default DisplaySubject;
