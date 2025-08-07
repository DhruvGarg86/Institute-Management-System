

import { useEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group, Inject } from '@syncfusion/ej2-react-grids';
import { toast } from 'react-toastify';
import { getStudentAttendance } from '../../services/Admin/Student';
import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';

function TeacherStudentAttendance() {
    const gridRef = useRef(null);

    const [students, setStudents] = useState([]);

    const StudentAttendance = async () => {
        try {
            const response = await getStudentAttendance();
            console.log(response);
            setStudents(response);
            toast.success("Students loaded successfully");
        } catch (error) {
            toast.error("Unable to load students");
            console.log(error);
        }
    }

    useEffect(() => {
        StudentAttendance();
    },[]);
    const rowDataBound = (args) => {
        const attendanceStr = args.data.attendance;
        const attendanceValue = parseInt(attendanceStr);

        if (attendanceValue < 70) {
            args.row.style.backgroundColor = '#fdecea';
        }
    };

    return (
        <>
            <TeacherNavbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <TeacherSidebar />
                    </div>
                    <div className="col-7-5  admin-dashboard-second p-4 admin-notice-box">
                        <h2 className="mb-2 fw-bold text-primary">Attendance Overview</h2>
                        {/* Second Row */}
                        <div className="row p-3 mt-3">
                            <h5 className="fw-bold">LeaderBoard</h5>

                            <GridComponent
                                rowHeight={40}
                                ref={gridRef}
                                dataSource={students}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                pageSettings={{ pageSize: 8 }}
                                allowPrint={true}
                                allowFiltering={true}
                                filterSettings={{ type: 'Menu' }}
                                allowGrouping={true}
                                toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
                                rowDataBound={rowDataBound}
                                toolbarClick={(args) => {
                                    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                    if (args.item.id.includes('print')) gridRef.current.print();
                                }}

                            >

                                <ColumnsDirective>
                                    <ColumnDirective field='image' headerText='Profile' width={30} allowFiltering={false} allowSorting={false} template={(props) => (
                                        <img src={props.profilePic} alt="avatar" style={{ borderRadius: '50%', height: '30px', objectFit: 'cover' }} />
                                    )} />
                                    <ColumnDirective field='name' headerText='Name' textAlign="center" width={50} />
                                    <ColumnDirective field='courseName' headerText='Course' width={40} />
                                    <ColumnDirective field='id' headerText='Roll No.' textAlign="center" width={30} />
                                    <ColumnDirective field='PhoneNumber' headerText='Phone' width={50} allowSorting={false} />
                                    <ColumnDirective
                                        field='attendancePercentage'
                                        headerText='Attendance'
                                        width={50}
                                        textAlign="center"
                                        type="number"
                                        template={(props) => `${props.attendancePercentage}%`}
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

export default TeacherStudentAttendance;
