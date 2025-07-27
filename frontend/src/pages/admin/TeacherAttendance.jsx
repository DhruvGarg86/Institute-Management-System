import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllTeachersWithAttendance } from '../../services/Admin/Teacher';

import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group, Inject
} from '@syncfusion/ej2-react-grids';

function TeacherAttendance() {
    const gridRef = useRef(null);

    const [teachers, setTeachers] = useState([]);

    const loadAllTeachers = async () => {
        try {
            const data = await getAllTeachersWithAttendance();
            setTeachers(data);
            console.log(data);
        } catch (error) {
            console.error("Error loading teachers:", error); // For debugging purposes only
            toast.error("Failed to load teachers. Please try again later.");
        }
    };

    useEffect(() => {
        loadAllTeachers();
    }, []);

    const rowDataBound = (args) => {
        const attendanceValue = parseInt(args.data.attendancePercentage);
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
                                    <ColumnDirective field='image' headerText='Profile' width={50} allowFiltering={false} allowSorting={false}
                                        template={(props) => (
                                            <img src={props.image} alt="avatar" style={{ borderRadius: '50%', height: '30px', width: '30px', objectFit: 'cover' }} />
                                        )} />
                                    <ColumnDirective field='name' headerText='Name' width={60} textAlign='Center' />
                                    <ColumnDirective field='email' headerText='Email ID' width={110} />
                                    <ColumnDirective field='subject' headerText='Subject' width={90} />
                                    <ColumnDirective field='joiningDate' headerText='Joining Date' width={80} textAlign='Center' />
                                    <ColumnDirective field='phoneNumber' headerText='Contact' width={90} />
                                    <ColumnDirective field='attendancePercentage' headerText='Attendance' width={70} textAlign="Center"
                                        template={(props) => `${props.attendancePercentage}%`} />
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
