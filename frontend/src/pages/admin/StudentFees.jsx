import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
  ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject, Edit
} from '@syncfusion/ej2-react-grids';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllFees } from '../../services/Admin/Student';

function StudentFees() {

  const gridRef = useRef(null);

  const [fees, setFees] = useState([]);

  const getFee = async () => {
    try {
      const response = await getAllFees();
      toast.success("Fees loaded successfully");
      setFees(response);
    } catch (error) {
      toast.error("Unable to load fee details");
      console.error(error);
    }
  }

  useEffect(() => {
    getFee();
  }, [])

  const rowDataBound = (args) => {
    if (args.data.feeStatus === 'PENDING') {
      args.row.style.backgroundColor = '#fff3cd';
    }
    if (args.data.feeStatus === 'UNPAID') {
      args.row.style.backgroundColor = '#f1aeb5';
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
              <h3 className="fw-bold text-primary mb-3">Student Fee List</h3>

              <GridComponent
                ref={gridRef}
                dataSource={fees}
                allowSorting={true}
                allowExcelExport={true}
                allowPdfExport={true}
                allowPaging={true}
                pageSettings={{ pageSize: 7 }}
                allowPrint={true}
                allowFiltering={true}
                rowDataBound={rowDataBound}
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
                  <ColumnDirective field='imagePath' headerText='Profile' width='100' textAlign="Center"
                    allowFiltering={false} allowSorting={false} allowSearching={false}
                    template={(props) => (
                      <img
                        src={props.imagePath}
                        alt="avatar"
                        style={{ borderRadius: '50%', height: '30px', width: '30px', objectFit: 'cover' }}
                      />
                    )}
                  />
                  <ColumnDirective field='studentName' headerText='Name' textAlign='Center' width='120' />
                  <ColumnDirective field='studentId' headerText='RollNo' textAlign='Center' width='120' />
                  <ColumnDirective field='dueDate' headerText='Due Date' textAlign='Center' width='140' />
                  <ColumnDirective field='courseName' headerText='Course' width='120' />
                  <ColumnDirective field='totalAmount' headerText='Total' textAlign='Center' width='110' />
                  <ColumnDirective field='amountPaid' headerText='Paid' textAlign='Center' width='110' />
                  <ColumnDirective field='remainingAmount' headerText='Pending' width='130' textAlign='Center'
                    template={(props) => (
                      <span>
                        ₹{(props.totalAmount - props.amountPaid).toLocaleString()}
                      </span>
                    )}
                  />

                  <ColumnDirective field='feeStatus' headerText='status' width='120' textAlign='Center' />
                  {/* <ColumnDirective headerText='Action' width='100' textAlign='Center'
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
                  /> */}
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
