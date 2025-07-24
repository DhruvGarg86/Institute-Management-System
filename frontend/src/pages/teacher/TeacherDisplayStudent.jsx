import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, 
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject } from '@syncfusion/ej2-react-grids';
import { FaEdit, FaTrash } from 'react-icons/fa';


import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';





const sampleStudents = [
    {
        name: "Aarav Sharma",
        roll: "01",
        address: "D-45, Connaught Place, New Delhi",
        studentClass: "01",
        dob: "02/05/2005",
        phone: "+91 9876543210",
        avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Aarav Sharma",
        roll: "01",
        address: "D-45, Connaught Place, New Delhi",
        studentClass: "01",
        dob: "02/05/2005",
        phone: "+91 9876543210",
        avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Ananya Verma",
        roll: "10",
        address: "C-12, Bandra West, Mumbai",
        studentClass: "02",
        dob: "03/04/2004",
        phone: "+91 9123456780",
        avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Rohan Patel",
        roll: "04",
        address: "45-A, Navrangpura, Ahmedabad",
        studentClass: "01",
        dob: "12/05/2005",
        phone: "+91 9988776655",
        avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
        name: "Meera Iyer",
        roll: "03",
        address: "22, T. Nagar, Chennai",
        studentClass: "02",
        dob: "03/05/2005",
        phone: "+91 8877665544",
        avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
        name: "Aditya Singh",
        roll: "15",
        address: "67, Gomti Nagar, Lucknow",
        studentClass: "04",
        dob: "12/05/2005",
        phone: "+91 7766554433",
        avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
        name: "Dhruv Garg",
        roll: "01",
        address: "9-10, Banjara Hills, Hyderabad",
        studentClass: "04",
        dob: "12/03/2005",
        phone: "+91 7654321098",
        avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
        name: "Vikram Desai",
        roll: "11",
        address: "101, Koregaon Park, Pune",
        studentClass: "01",
        dob: "03/05/2006",
        phone: "+91 7098765432",
        avatar: "https://i.pravatar.cc/40?img=7",
    }
];


function TeacherDisplayStudent() {
    const navigate = useNavigate();

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
                            <h3 className='fw-bold' style={{ color: '#4361e5' }}>Student List</h3>
                            <GridComponent
                                ref={gridRef}
                                dataSource={sampleStudents}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                // allowFiltering={true}
                                pageSettings={{ pageSize: 7 }}
                                toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
                                toolbarClick={(args) => {
                                    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                    if (args.item.id.includes('print')) gridRef.current.print();
                                }}

                            >

                                <ColumnsDirective>
                                    <ColumnDirective field='avatar' headerText='Profile' width='60' template={(props) => (
                                        <img src={props.avatar} alt="avatar" style={{ borderRadius: '50%', height: '45px', objectFit: 'cover' }} />
                                    )} />
                                    <ColumnDirective field='name' headerText='Name' textAlign="Center" width='85' />
                                    <ColumnDirective field='roll' headerText='Roll' textAlign="Center" width='50' />
                                    <ColumnDirective field='address' headerText='Address' width='150' />
                                    <ColumnDirective field='studentClass' headerText='Class' textAlign="Center" width='57' />
                                    <ColumnDirective field='dob' headerText='DOB' textAlign="Center" width='75' />
                                    <ColumnDirective field='phone' headerText='Phone' width='95' />
                                    <ColumnDirective headerText='Action' width='135'
                                        template={(props) => {
                                            return (
                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-light text-primary me-2"
                                                        onClick={() => navigate(`/teacher/student-marks/${props.roll}`)}
                                                    >
                                                        View Marks
                                                    </button>
                                                </div>
                                            );
                                        }} />
                                </ColumnsDirective>

                                <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search]} />
                            </GridComponent>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherDisplayStudent;
