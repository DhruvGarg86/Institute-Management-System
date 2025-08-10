import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter,
    ExcelExport, PdfExport, Toolbar, Print, Page, Search, Inject,
    Group
} from '@syncfusion/ej2-react-grids';
import { deleteComplaintById, getAllComplaint } from '../../services/Admin/Complaint';

function DisplayComplaint() {

    const navigate = useNavigate();
    const gridRef = useRef(null);

    const [complaint, setComplaint] = useState([]);

    const getComplaints = async () => {
        try {
            const response = await getAllComplaint();
            setComplaint(response);
            toast.success("Complaints loaded successfully!");
        } catch (error) {
            // console.log(error);
            toast.error("Failed to load complaints");
        }
    }

    useEffect(() =>{
        getComplaints();
    },[])

  
    const handleDelete = async(id) =>{
        try {
            await deleteComplaintById(id);
            toast.success("Complaint deleted successfully!");
            getComplaints();
        } catch (error) {
            // console.log(error);
            toast.error("Failed to delete complaint");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-7-5 admin-dashboard-second p-4">
                        <div className="card p-4 shadow">
                            <h3 className='fw-bold' style={{ color: '#4361e5' }}>Complaint List</h3>
                            <GridComponent
                                ref={gridRef}
                                dataSource={complaint}
                                allowSorting={true}
                                allowExcelExport={true}
                                allowPdfExport={true}
                                allowPaging={true}
                                allowFiltering={false}
                                allowGrouping={true}
                                pageSettings={{ pageSize: 7 }}
                                toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
                                toolbarClick={(args) => {
                                    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
                                    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
                                    if (args.item.id.includes('print')) gridRef.current.print();
                                }}
                            >

                                <ColumnsDirective>
                                    <ColumnDirective field='studentName' headerText='Name' width='80' />
                                    {/* <ColumnDirective field='course' headerText='Course' width='100' textAlign="Center" /> */}
                                    <ColumnDirective field='description' headerText='Description' width='220' />
                                    <ColumnDirective field='status' headerText='Status' width='60' textAlign="Center" />
                                    <ColumnDirective field='date' headerText='Date' width='70' textAlign="Center" />

                                    <ColumnDirective headerText='Action' width='80'
                                        template={(props) => (
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => navigate(`/admin/edit-complaint/${props.id}`)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-light text-danger ms-2"
                                                    onClick={() => handleDelete(props.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
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

export default DisplayComplaint;
