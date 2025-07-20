import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaEnvelope } from 'react-icons/fa';
import { useRef } from 'react';

import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip
} from '@syncfusion/ej2-react-charts';
import { Export } from '@syncfusion/ej2-charts';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, ExcelExport, PdfExport, Toolbar, Print } from '@syncfusion/ej2-react-grids';

function StudentMarks() {
    const data = [
        { name: 'English', value: 40 },
        { name: 'Science', value: 20 },
        { name: 'Social', value: 10 },
        { name: 'Maths', value: 30 },
    ];
    const data1 = [
        { Subject: 'English', Total: 50, Obtained: 40, Percentage: 80, Grade: 'B+' },
        { Subject: 'Science', Total: 50, Obtained: 20, Percentage: 40, Grade: 'D' },
        { Subject: 'Science', Total: 50, Obtained: 20, Percentage: 40, Grade: 'D' },
        { Subject: 'Science', Total: 50, Obtained: 20, Percentage: 40, Grade: 'D' },
    ];

    const student = {
        name: "Dhruv Garg",
        email: "dhruvgarg086@gmail.com",
        rollNo: "2000300100084",
        dob: "23-12-2002",
        course: "B.TECH",
        class: "2nd Year",
        profilePic: "https://media1.tenor.com/m/uavHvpMwWSEAAAAC/cat-cat-meme.gif",
    };

    const chartRef = useRef(null);
    const gridRef = useRef(null);


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
                                {/* First Row: Profile */}
                                <div className="row mb-4">
                                    <div className="col border rounded mx-2 p-3 d-flex align-items-center justify-content-between">
                                        {/* Left Part of Student details */}
                                        <div className="d-flex align-items-center ms-2" style={{ minWidth: "250px" }}>
                                            <img
                                                src={student.profilePic}
                                                alt="Profile"
                                                className="rounded-circle me-3"
                                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                            />
                                            <div>
                                                <h5 className="mb-1 fw-bold">{student.name}</h5>
                                                <p className="mb-0 text-muted">
                                                    <FaEnvelope className="me-2" />
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Right Part of Student details */}
                                        <div className="me-3">
                                            <p className="mb-1"><strong>Roll No:</strong> {student.rollNo}</p>
                                            <p className="mb-1"><strong>DOB:</strong> {student.dob}</p>
                                            <p className="mb-1"><strong>Course:</strong> {student.course}</p>
                                            <p className="mb-0"><strong>Class:</strong> {student.class}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Second Row: Mark Details */}
                                <div className="row g-2 position-relative" style={{ minHeight: '60px' }}>
                                    <button
                                        className="btn btn-outline-primary btn-sm position-absolute"
                                        style={{ width: 'auto', top: 0, right: 10, zIndex: 10, padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                        onClick={() => chartRef.current.exportModule.export('PNG', 'Student_Marks')}
                                    >
                                        Download Chart
                                    </button>
                                    <div className="col-4 rounded">
                                        <AccumulationChartComponent
                                            id='studentMarksChart'
                                            ref={chartRef}
                                            legendSettings={{ position: 'Bottom' }}
                                            tooltip={{ enable: true }}
                                        >
                                            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip, Export]} />
                                            <AccumulationSeriesCollectionDirective>
                                                <AccumulationSeriesDirective
                                                    type='Pie'
                                                    dataSource={data}
                                                    innerRadius='50%'
                                                    xName='name'
                                                    yName='value'
                                                    dataLabel={{
                                                        visible: true,
                                                        position: 'Inside',
                                                        name: 'value',
                                                        font: { fontWeight: '600' }
                                                    }}
                                                    explode={true}
                                                    explodeOffset='10%'
                                                    startAngle={0}
                                                    endAngle={360}
                                                />
                                            </AccumulationSeriesCollectionDirective>
                                        </AccumulationChartComponent>
                                    </div>
                                    <div className="col-8 rounded" style={{ marginTop: '80px' }}>
                                        <GridComponent
                                            ref={gridRef}
                                            dataSource={data1}
                                            allowSorting={true}
                                            allowExcelExport={true}
                                            allowPdfExport={true}
                                            allowPrint={true}
                                            toolbar={['ExcelExport', 'PdfExport', 'Print']}
                                            toolbarClick={(args) => {
                                                if (args.item.id.includes('pdfexport')) {
                                                    gridRef.current.pdfExport();
                                                }
                                                if (args.item.id.includes('excelexport')) {
                                                    gridRef.current.excelExport();
                                                }if (args.item.id.includes('print')) {
                                                    gridRef.current.print();
                                                }
                                            }}
                                        >
                                            <ColumnsDirective>
                                                <ColumnDirective field='Subject' headerText='Subject' />
                                                <ColumnDirective field='Total' headerText='Total Marks' textAlign="center" />
                                                <ColumnDirective field='Obtained' headerText='Marks Obtained' textAlign="center" />
                                                <ColumnDirective field='Percentage' headerText='Percentage' textAlign="center" />
                                                <ColumnDirective field='Grade' headerText='Grade' />
                                            </ColumnsDirective>
                                            <Inject services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print]} />
                                        </GridComponent>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentMarks;
