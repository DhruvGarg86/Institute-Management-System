import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject,
    Group
} from '@syncfusion/ej2-react-grids';

function DisplayComplaint() {

    const navigate = useNavigate();
    const gridRef = useRef(null);

    // ✅ Make complaints state editable
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            submittedBy: "John Doe",
            course: "B.Sc Computer Science",
            title: "Library Issue",
            description: "Books are not available for reference.",
            date: "2025-08-01",
            status: "Active"
        },
        {
            id: 2,
            submittedBy: "Sarah Smith",
            course: "B.A English",
            title: "Classroom Maintenance",
            description: "Projector in room 203 is not working.",
            date: "2025-07-30",
            status: "Resolved"
        },
        {
            id: 3,
            submittedBy: "Michael Lee",
            course: "B.Com",
            title: "Cafeteria Food",
            description: "Food quality needs improvement.",
            date: "2025-07-28",
            status: "Resolved"
        },
        {
            id: 4,
            submittedBy: "Emily Johnson",
            course: "B.Sc Mathematics",
            title: "Hostel Cleanliness",
            description: "The hostel bathrooms need regular cleaning.",
            date: "2025-07-25",
            status: "Active"
        }
    ]);

    // ✅ Delete complaint function
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this complaint?")) {
            setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
            toast.success("Complaint deleted successfully!");
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
                            <h3 className='fw-bold' style={{ color: '#4361e5' }}>Complaint List</h3>
                            <GridComponent
                                ref={gridRef}
                                dataSource={complaints}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                allowFiltering={false}
                                allowGrouping={true}
                                pageSettings={{ pageSize: 7 }}
                                toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
                                toolbarClick={(args) => {
                                    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                    if (args.item.id.includes('print')) gridRef.current.print();
                                }}
                            >

                                <ColumnsDirective>
                                    <ColumnDirective field='submittedBy' headerText='Name' width='80' />
                                    <ColumnDirective field='course' headerText='Course' width='100' textAlign="Center" />
                                    <ColumnDirective field='description' headerText='Description' width='220' />
                                    <ColumnDirective field='status' headerText='Status' width='60' textAlign="Center" />
                                    <ColumnDirective field='date' headerText='Date' width='70' textAlign="Center" />

                                    <ColumnDirective headerText='Action' width='80'
                                        template={(props) => (
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => navigate(`/admin/edit-complaint/${props.id}`)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-light text-danger ms-2"
                                                    onClick={() => handleDelete(props.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    />
                                </ColumnsDirective>

                                <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group]} />
                            </GridComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayComplaint;
