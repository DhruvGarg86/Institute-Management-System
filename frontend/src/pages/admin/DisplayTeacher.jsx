import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject
} from '@syncfusion/ej2-react-grids';
import { toast } from 'react-toastify';
import { deleteTeacherById, getAllTeachers } from '../../services/Admin/Teacher';
import { getAllTeachers } from '../../services/Admin/Teacher';
import TeacherSidebar from '../teacher/TeacherSidebar';

function DisplayTeacher() {

    const navigate = useNavigate();
    const gridRef = useRef(null);

    const [teachers, setTeachers] = useState([]);

    // Function to load all teachers
    const loadAllTeachers = async () => {
        try {
            const data = await getAllTeachers();
            const formattedData = data.map(teacher => (
                {
                    ...teacher, subjects: teacher.subjects.map(sub => sub.name).join(",")
                }
            ));
            setTeachers(formattedData);
            console.log(data);
        } catch (error) {
            console.error("Error loading teachers:", error); // For debugging purposes only
            toast.error("Failed to load teachers. Please try again later.");
        }
    };

    // Call the loadAllTeachers function when the component mounts
    useEffect(() => {
        loadAllTeachers();
    }, []);

    // Function to SOFT delete a teacher
    const deleteTeacher = async (id) => {
        try {
            await deleteTeacherById(id);
            toast.success("Teacher deleted successfully");
            loadAllTeachers();
        } catch (error) {
            console.error("Error deleting teacher:", error); // For debugging purposes only
            toast.error("Failed to delete teachers. Please try again later.");
        }
    }
    return (
        <>
            <Navbar />
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
                                dataSource={teachers}
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
                                        <img src={props.image} alt="avatar" style={{ borderRadius: '50%', height: '40px', width: '40px', objectFit: 'cover' }} />
                                    )} />
                                    <ColumnDirective field='name' headerText='Name' textAlign="Center" width='87' />
                                    <ColumnDirective field='phoneNumber' headerText='Contact' textAlign="Center" width='80' />
                                    <ColumnDirective field='address' headerText='Address' width='110' />
                                    <ColumnDirective field='email' headerText='Email' textAlign="Center" width='130' />
                                    <ColumnDirective field='joiningDate' headerText='Joining' textAlign="Center" width='75' />
                                    <ColumnDirective field='subjects' headerText='Subject' width='95' />
                                    <ColumnDirective headerText='Action' width='60'
                                        template={(props) => {
                                            return (
                                                <div>
                                                    {/* <button
                                                        className="btn btn-sm btn-light text-primary me-2"
                                                        onClick={() => navigate(`/admin/student-marks/${props.roll}`)}
                                                    >
                                                        View Attendance
                                                    </button> */}
                                                    <button
                                                        className="btn btn-sm btn-light me-2"
                                                        onClick={() => navigate(`/admin/edit-teacher/${props.id}`)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-light text-danger"
                                                        onClick={() => deleteTeacher(props.id)}
                                                    >
                                                        <FaTrash />
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

export default DisplayTeacher;
