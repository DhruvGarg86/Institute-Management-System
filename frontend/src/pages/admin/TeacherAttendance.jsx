import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { useRef } from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group, Inject
} from '@syncfusion/ej2-react-grids';

function TeacherAttendance() {
    const teachers = [
        {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            joiningDate: "15-06-2017",
            dob: "10-02-1985",
            subject: "Web Development",
            contact: "9876543210",
            attendance: "92",
            profilePic: "https://i.pravatar.cc/40?img=1"
        },
        {
            name: "Brian Smith",
            email: "brian.smith@example.com",
            joiningDate: "01-09-2015",
            dob: "22-08-1983",
            subject: "Data Science",
            contact: "8765432109",
            attendance: "78",
            profilePic: "https://i.pravatar.cc/40?img=2"
        },
        {
            name: "Catherine Lee",
            email: "catherine.lee@example.com",
            joiningDate: "20-01-2018",
            dob: "15-03-1988",
            subject: "Cyber Security",
            contact: "7654321098",
            attendance: "61",
            profilePic: "https://i.pravatar.cc/40?img=3"
        },
        {
            name: "David Brown",
            email: "david.brown@example.com",
            joiningDate: "12-04-2019",
            dob: "12-11-1987",
            subject: "JavaScript",
            contact: "9123456780",
            attendance: "84",
            profilePic: "https://i.pravatar.cc/40?img=4"
        },
        {
            name: "Emily Walker",
            email: "emily.walker@example.com",
            joiningDate: "30-07-2020",
            dob: "05-07-1990",
            subject: "Statistics",
            contact: "9988776655",
            attendance: "68",
            profilePic: "https://i.pravatar.cc/40?img=5"
        },
    ];

    const gridRef = useRef(null);

    const rowDataBound = (args) => {
        const attendanceValue = parseInt(args.data.attendance);
        if (attendanceValue < 70) {
            args.row.style.backgroundColor = '#fdecea';
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
                    <div className="col-7-5 admin-dashboard-second p-4 admin-notice-box">
                        <h2 className="mb-2 fw-bold text-primary">Teacher Attendance Overview</h2>
                        <div className="row p-3 mt-1">
                            <h5 className="fw-bold">Attendance Leaderboard</h5>

                            <GridComponent
                                rowHeight={40}
                                ref={gridRef}
                                dataSource={teachers}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                pageSettings={{ pageSize: 10 }}
                                allowPrint={true}
                                allowFiltering={true}
                                filterSettings={{ type: 'Menu' }}
                                allowGrouping={true}
                                rowDataBound={rowDataBound}
                                toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
                                toolbarClick={(args) => {
                                    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                    if (args.item.id.includes('print')) gridRef.current.print();
                                }}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective field='profilePic' headerText='Profile' width={50} allowFiltering={false} allowSorting={false}
                                        template={(props) => (
                                            <img src={props.profilePic} alt="avatar" style={{ borderRadius: '50%', height: '30px', objectFit: 'cover' }} />
                                        )} />
                                    <ColumnDirective field='name' headerText='Name' width={60} textAlign='Center' />
                                    <ColumnDirective field='email' headerText='Email ID' width={110} />
                                    <ColumnDirective field='subject' headerText='Subject' width={90} />
                                    <ColumnDirective field='joiningDate' headerText='Joining Date' width={80} textAlign='Center' />
                                    <ColumnDirective field='contact' headerText='Contact' width={90} />
                                    <ColumnDirective field='attendance' headerText='Attendance' width={70} textAlign="Center"
                                        template={(props) => `${props.attendance}%`} />
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

export default TeacherAttendance;
