import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject
} from '@syncfusion/ej2-react-grids';


const sampleTeachers = [
    {
        roll: "T101",
        name: "Alice Johnson",
        phone_number: "9876543210",
        email: "alice.johnson@example.com",
        salary: 55000.0,
        joining_date: "10/01/2023",
        address: "123 Maple Street, New York",
        subjects: ["HTML", "CSS", "JavaScript"], // FIXED
        gender: "Female",
        image: "https://i.pravatar.cc/40?img=5"
    },
    {
        roll: "T102",
        name: "Brian Smith",
        phone_number: "8765432109",
        email: "brian.smith@example.com",
        salary: 60000.0,
        joining_date: "01/08/2022",
        address: "456 Oak Avenue, Chicago",
        subjects: ["Python", "Machine Learning"],
        gender: "Male",
        image: "https://i.pravatar.cc/40?img=6"
    },
    {
        roll: "T103",
        name: "Catherine Lee",
        phone_number: "7654321098",
        email: "catherine.lee@example.com",
        salary: 62000.0,
        joining_date: "15/03/2023",
        address: "789 Pine Road, Los Angeles",
        subjects: ["Cyber Security", "Ethical Hacking"],
        gender: "Female",
        image: "https://i.pravatar.cc/40?img=7"
    },
    {
        roll: "T104",
        name: "David Brown",
        phone_number: "6543210987",
        email: "david.brown@example.com",
        salary: 58000.0,
        joining_date: "05/01/2024",
        address: "321 Cedar Lane, Houston",
        subjects: ["React", "JavaScript"],
        gender: "Male",
        image: "https://i.pravatar.cc/40?img=8"
    },
    {
        roll: "T105",
        name: "Emily Walker",
        phone_number: "5432109876",
        email: "emily.walker@example.com",
        salary: 61000.0,
        joining_date: "20/11/2023",
        address: "654 Birch Blvd, San Francisco",
        subjects: ["Deep Learning", "Statistics"],
        gender: "Female",
        image: "https://i.pravatar.cc/40?img=9"
    },
    {
        roll: "T106",
        name: "Emily Walker",
        phone_number: "5432109876",
        email: "emily.walker@example.com",
        salary: 61000.0,
        joining_date: "20/11/2023",
        address: "654 Birch Blvd, San Francisco",
        subjects: ["Deep Learning", "Statistics"],
        gender: "Female",
        image: "https://i.pravatar.cc/40?img=10"
    },
    {
        roll: "T107",
        name: "Emily Walker",
        phone_number: "5432109876",
        email: "emily.walker@example.com",
        salary: 61000.0,
        joining_date: "20/11/2023",
        address: "654 Birch Blvd, San Francisco",
        subjects: ["Deep Learning", "Statistics"],
        gender: "Female",
        image: "https://i.pravatar.cc/40?img=11"
    }
];


function TeacherDisplayTeacher() {

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
                            <h3 className='fw-bold' style={{ color: '#4361e5' }}>Teacher List</h3>
                            <GridComponent
                                ref={gridRef}
                                dataSource={sampleTeachers}
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
                                    <ColumnDirective field='image' headerText='Profile' width='60' allowSorting={false} template={(props) => (
                                        <img src={props.image} alt="avatar" style={{ borderRadius: '50%', height: '45px', objectFit: 'cover' }} />
                                    )} />
                                    <ColumnDirective field='name' headerText='Name' textAlign="Center" width='87' />
                                    <ColumnDirective field='phone_number' headerText='Contact' textAlign="Center" width='80' />
                                    <ColumnDirective field='address' headerText='Address' width='130' />
                                    <ColumnDirective field='email' headerText='Email' textAlign="Center" width='130' />
                                    <ColumnDirective field='joining_date' headerText='Joining' textAlign="Center" width='75' />
                                    <ColumnDirective field='subjects' headerText='Subject' width='95' 
                                    />
                                    
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

export default TeacherDisplayTeacher;
