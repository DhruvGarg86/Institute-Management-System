import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { useRef } from 'react';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group } from '@syncfusion/ej2-react-grids';
import TeacherSidebar from './TeacherSidebar';
import TeacherNavbar from './TeacherNavbar';

function TeacherStudentAttendance() {
    const student = [
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            attendance: "38",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "BCOM",
            class: "2nd Year",
            attendance: "68",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "MBBS",
            class: "2nd Year",
            attendance: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "MBBS",
            class: "2nd Year",
            attendance: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "MBBS",
            class: "2nd Year",
            attendance: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "MBBS",
            class: "2nd Year",
            attendance: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "MBBS",
            class: "2nd Year",
            attendance: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            attendance: "57",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
    ];
    const gridRef = useRef(null);

    const rowDataBound = (args) => {
        const attendanceStr = args.data.attendance;
        const attendanceValue = parseInt(attendanceStr);

        if (attendanceValue < 70) {
            args.row.style.backgroundColor = '#de4f3cff';
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
                        <div className="row p-3 mt-1">
                            <h5 className="fw-bold">LeaderBoard</h5>

                            <GridComponent
                                rowHeight={40}
                                ref={gridRef}
                                dataSource={student}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                pageSettings={{ pageSize: 10 }}
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
                                    <ColumnDirective field='profilePic' headerText='Profile' width={30} template={(props) => (
                                        <img src={props.profilePic} alt="avatar" style={{ borderRadius: '50%', height: '30px', objectFit: 'cover' }} />
                                    )} />
                                    <ColumnDirective field='name' headerText='Name' textAlign="center" width={50} />
                                    <ColumnDirective field='course' headerText='Course' width={40} />
                                    <ColumnDirective field='rollNo' headerText='Roll No.' textAlign="center" width={50} />
                                    <ColumnDirective field='class' headerText='Class' width={50} />
                                    <ColumnDirective
                                        field='attendance'
                                        headerText='Attendance'
                                        width={50}
                                        textAlign="center"
                                        type="number"
                                        template={(props) => `${props.attendance}%`}
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
