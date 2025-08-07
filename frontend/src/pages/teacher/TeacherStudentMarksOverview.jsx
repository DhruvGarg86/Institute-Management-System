import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useRef, useState } from 'react';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group, Edit } from '@syncfusion/ej2-react-grids';
import { toast } from 'react-toastify';
import { getCourseTopper, getStudentMarks } from '../../services/Admin/Student';
import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';

function TeacherStudentMarksOverview() {

    const [student, setStudent] = useState([]);

    const studentMarks = async () => {
        try {
            const response = await getStudentMarks();
            setStudent(response);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load students");
        }
    };


    const [students, setStudents] = useState([]);
    const CourseTopper = async () => {
        try {
            const response = await getCourseTopper();
            setStudents(response);
        } catch (error) {
            console.log(error);
            toast.error("Unable to load students");
        }
    }

    useEffect(() => {
        CourseTopper();
        studentMarks();
    }, [])

    const sortedStudents = [...students].sort((a, b) => b.percentage - a.percentage);
    const sortedStudent = [...student].sort((a, b) => b.percentage - a.percentage);


    const gridRef = useRef(null);

    const rowDataBound = (args) => {
        const marks = args.data.marks;

        if (marks <= 40) {
            args.row.style.backgroundColor = '#dd7681ff';
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
                        <h2 className="mb-2 fw-bold text-primary">Marks Overview</h2>
                        <div className="card p-3 shadow-sm mb-5 admin-add-notice-box">
                            <div className="container">
                                {/* First Row */}
                                <div className="row">
                                    <div className="top-students-container d-flex flex-wrap gap-2">
                                        {sortedStudents.map((students, index) => (
                                            <div key={index} className="student-card d-flex align-items-center p-2 bg-white rounded shadow-sm">
                                                <img
                                                    src={students.imagePath || 'https://via.placeholder.com/70'}  // fallback image
                                                    alt={students.studentName}
                                                    className="rounded-circle student-img me-3"
                                                    style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{students.studentName}</div>
                                                    <div className="student-subtitle text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        {students.courseName}
                                                    </div>
                                                    <div className="student-score fw-semibold" style={{ fontSize: '1.3rem' }}>
                                                        {students.percentage}%
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
                                        dataSource={sortedStudent}
                                        allowSorting={true}
                                        allowExcelExport={true}
                                        allowPdfExport={true}
                                        allowPaging={true}
                                        pageSettings={{ pageSize: 5 }}
                                        allowPrint={true}
                                        editSettings={{ allowEditing: true }}
                                        allowGrouping={true}
                                        toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print', 'Edit']}
                                        rowDataBound={rowDataBound}
                                        toolbarClick={(args) => {
                                            if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                            if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                            if (args.item.id.includes('print')) gridRef.current.print();
                                        }}
                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective field='studentName' headerText='Name' textAlign="center" width={'50'} />
                                            <ColumnDirective field='courseName' headerText='Course' width={'40'} />
                                            <ColumnDirective field='percentage' headerText='Percentage' textAlign="center" width={'50'} />
                                            <ColumnDirective field='studentId' headerText='Roll No.' textAlign="center" width={'70'} />
                                            {/* <ColumnDirective field='class' headerText='Class' width={'50'} /> */}
                                        </ColumnsDirective>
                                        <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search, Group, Edit]} />
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

export default TeacherStudentMarksOverview;
