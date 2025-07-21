import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useRef } from 'react';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group } from '@syncfusion/ej2-react-grids';

function StudentMarksOverview() {


    const student = [
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            marks: "38",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            marks: "68",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            marks: "98",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
        {
            name: "Dhruv Garg",
            email: "dhruvgarg086@gmail.com",
            rollNo: "2000300100084",
            dob: "23-12-2002",
            course: "B.TECH",
            class: "2nd Year",
            marks: "57",
            profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif"
        },
    ];
    const sortedStudents = [...student].sort((a, b) => b.marks - a.marks);


    const gridRef = useRef(null);

    const rowDataBound = (args) => {
        const marks = args.data.marks;

        if (marks <= 40) {
            args.row.style.backgroundColor = '#dd7681ff';
        }
    };


    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-9 admin-dashboard-second p-4 admin-notice-box">
                        <h2 className="mb-2 fw-bold text-primary">Marks Overview</h2>
                        <div className="card p-3 shadow-sm mb-5 admin-add-notice-box">
                            <div className="container">
                                {/* First Row */}
                                <div className="row">
                                    <div className="top-students-container d-flex flex-wrap gap-2">
                                        {sortedStudents.map((student, index) => (
                                            <div key={index} className="student-card d-flex align-items-center p-2 bg-white rounded shadow-sm">
                                                <img
                                                    src={student.profilePic}
                                                    alt={student.name}
                                                    className="rounded-circle student-img me-3"
                                                    style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <div className="text small">Rank #{index + 1}</div>
                                                    <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{student.name}</div>
                                                    <div className="student-subtitle text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        {student.course}
                                                    </div>
                                                    <div className="student-score fw-semibold" style={{ fontSize: '1.3rem' }}>
                                                        {student.marks}
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                                {/* Second Row */}
                                <div className="row p-3 mt-1">
                                    <h5 className="fw-bold">LeaderBoard</h5>
                                    <GridComponent
                                        ref={gridRef}
                                        dataSource={student}
                                        allowSorting={true}
                                        allowExcelExport={true}
                                        allowPdfExport={true}
                                        allowPaging={true}
                                        pageSettings={{ pageSize: 5 }}
                                        allowPrint={true}
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

                                            <ColumnDirective field='course' headerText='Course' width={'40'} />
                                            <ColumnDirective field='name' headerText='Name' textAlign="center" width={'50'} />
                                            <ColumnDirective field='marks' headerText='Marks Obtained' textAlign="center" width={'50'} />
                                            <ColumnDirective field='rollNo' headerText='Roll No.' textAlign="center" width={'70'} />
                                            <ColumnDirective field='class' headerText='Class' width={'50'} />
                                        </ColumnsDirective>
                                        <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group]} />
                                    </GridComponent>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentMarksOverview;
