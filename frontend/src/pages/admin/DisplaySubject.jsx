import { useEffect, useRef, useState } from "react";
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
import { toast } from "react-toastify";
import { deleteSubjectById, getAllSubjects } from "../../services/Admin/Subject";

function DisplaySubject() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    try {
      const response = await getAllSubjects();
      console.log(response);
      if (response.length === 0)
        toast.info("No subjects found");
      setSubjects(response);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load subjects");
    }
  }

  useEffect(() => {
    getSubjects();
  }, []);

  const deleteSubject = async (id) => {
    try {
      await deleteSubjectById(id);
      toast.success("Subject deleted successfully");
      getSubjects();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete subject");
    }
  }

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
                dataSource={subjects}
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
                    headerText="Action"
                    width="135"
                    template={(props) => (
                      <div>
                        <button
                          className="btn btn-sm btn-light me-2 text-primary"
                          onClick={() =>
                            navigate(`/admin/edit-subject/${props.id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-light text-danger"
                          onClick={() => deleteSubject(props.id)}

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
