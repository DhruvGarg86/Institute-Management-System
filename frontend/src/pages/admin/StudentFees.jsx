import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
  ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject, Edit
} from '@syncfusion/ej2-react-grids';
import { FaEdit } from 'react-icons/fa';

const sampleFeesData = [
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "CS101",
    studentClass: "CS-1",
    course: "Computer Science",
    totalFees: 80000,
    paid: 55000,
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "CS101",
    studentClass: "CS-1",
    course: "Computer Science",
    totalFees: 80000,
    paid: 55000,
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "CS101",
    studentClass: "CS-1",
    course: "Computer Science",
    totalFees: 80000,
    paid: 55000,
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "CS101",
    studentClass: "CS-1",
    course: "Computer Science",
    totalFees: 80000,
    paid: 55000,
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: 1,
    name: "Aarav Sharma",
    roll: "CS101",
    studentClass: "CS-1",
    course: "Computer Science",
    totalFees: 80000,
    paid: 55000,
    avatar: "https://i.pravatar.cc/40?img=1"
  },
  {
    id: 2,
    name: "Ananya Verma",
    roll: "IT202",
    studentClass: "IT-2",
    course: "Information Tech",
    totalFees: 75000,
    paid: 75000,
    avatar: "https://i.pravatar.cc/40?img=2"
  },
  {
    id: 3,
    name: "Rohan Patel",
    roll: "ME303",
    studentClass: "ME-3",
    course: "Mechanical",
    totalFees: 72000,
    paid: 60000,
    avatar: "https://i.pravatar.cc/40?img=3"
  },
  {
    id: 4,
    name: "Meera Iyer",
    roll: "EEE404",
    studentClass: "EEE-4",
    course: "Electrical",
    totalFees: 78000,
    paid: 50000,
    avatar: "https://i.pravatar.cc/40?img=4"
  }
];

function StudentFees() {
  const gridRef = useRef(null);
  const navigate = useNavigate();

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
              <h3 className="fw-bold text-primary mb-3">Student Fee List</h3>

              <GridComponent
                ref={gridRef}
                dataSource={sampleFeesData}
                allowSorting={true}
                allowExcelExport={true}
                allowPdfExport={true}
                allowPaging={true}
                pageSettings={{ pageSize: 7 }}
                allowPrint={true}
                allowFiltering={true}
                filterSettings={{ type: 'Menu' }}
                editSettings={{ allowEditing: true }}
                toolbar={['Search', 'ExcelExport', 'Print', 'Edit']}
                toolbarClick={(args) => {
                  if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                  if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                  if (args.item.id.includes('print')) gridRef.current.print();
                }}

              >
                <ColumnsDirective>
                  <ColumnDirective field='avatar' headerText='Profile' width='90' textAlign="Center"
                    allowFiltering={false} allowSorting={false}
                    template={(props) => (
                      <img
                        src={props.avatar}
                        alt="avatar"
                        style={{ borderRadius: '50%', height: '45px', objectFit: 'cover' }}
                      />
                    )}
                  />
                  <ColumnDirective field='name' headerText='Name' textAlign='Center' width='130' />
                  <ColumnDirective field='roll' headerText='RollNo' textAlign='Center' width='120' />
                  <ColumnDirective field='studentClass' headerText='Class' textAlign='Center' width='110' />
                  <ColumnDirective field='course' headerText='Course' width='120' />
                  <ColumnDirective field='totalFees' headerText='Total (₹)' textAlign='Center' width='120' />
                  <ColumnDirective field='paid' headerText='Paid (₹)' textAlign='Center' width='130' />
                  <ColumnDirective headerText='Remaining (₹)' width='140' textAlign='Center'
                    template={(props) => (
                      <span>
                        ₹{(props.totalFees - props.paid).toLocaleString()}
                      </span>
                    )}
                  />

                  <ColumnDirective headerText='Action' width='100' textAlign='Center'
                    template={(props) => (
                      <div>
                        <button
                          className="btn btn-sm btn-light me-2"
                          onClick={() => navigate(`/admin/edit-fee/${props.roll}`)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  />
                </ColumnsDirective>

                <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Edit]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFees;
