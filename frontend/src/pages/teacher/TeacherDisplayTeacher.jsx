import React, { useEffect, useRef, useState } from 'react';
import TeacherNavbar from './TeacherNavbar';
import TeacherSidebar from './TeacherSidebar';
import Footer from '../../components/Footer';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Filter,
  ExcelExport,
  PdfExport,
  Toolbar,
  Print,
  Page,
  Search,
  Inject
} from '@syncfusion/ej2-react-grids';

function TeacherDisplayTeacher() {
  const [teachers, setTeachers] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const dummyTeachers = [
      {
        id: 1,
        name: 'Dr. Aisha Khan',
        phoneNumber: '9876543210',
        address: '123 Park Street, Mumbai',
        email: 'aisha.khan@example.com',
        joiningDate: '2022-06-15',
        status: 'ACTIVE',
        image: 'https://i.pravatar.cc/100?img=12',
        subjects: [
          { id: 1, name: 'Mathematics', code: 'MATH101' },
          { id: 2, name: 'Statistics', code: 'STAT202' },
        ],
      },
      {
        id: 2,
        name: 'Mr. Rohan Desai',
        phoneNumber: '8765432109',
        address: '456 Main Road, Pune',
        email: 'rohan.desai@example.com',
        joiningDate: '2021-08-25',
        status: 'INACTIVE',
        image: 'https://i.pravatar.cc/100?img=14',
        subjects: [
          { id: 3, name: 'Java Programming', code: 'JAVA101' },
          { id: 4, name: 'Spring Boot', code: 'SPR202' },
        ],
      },
    ];

    setTeachers(dummyTeachers);
  }, []);

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
              <h3 className="fw-bold" style={{ color: '#4361e5' }}>
                Teacher List
              </h3>
              <GridComponent
  ref={gridRef}
  dataSource={teachers}
  allowSorting={true}
  allowExcelExport={true}
  allowPdfExport={true}
  allowPaging={true}
  allowTextWrap={true}
  textWrapSettings={{ wrapMode: 'Content' }}
  pageSettings={{ pageSize: 6 }}
  toolbar={['Search', 'ExcelExport', 'PdfExport', 'Print']}
  toolbarClick={(args) => {
    if (args.item.id.includes('pdfexport')) gridRef.current.pdfExport();
    if (args.item.id.includes('excelexport')) gridRef.current.excelExport();
    if (args.item.id.includes('print')) gridRef.current.print();
  }}
>
                <ColumnsDirective>
                  <ColumnDirective
                    field="image"
                    headerText="Profile"
                    width="60"
                    allowSorting={false}
                    template={(props) => (
                      <img
                        src={props.image}
                        alt="avatar"
                        style={{
                          borderRadius: '50%',
                          height: '38px',
                          width: '38px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  />
                  <ColumnDirective field="name" headerText="Name" width="100" clipMode="EllipsisWithTooltip" />
                  <ColumnDirective field="phoneNumber" headerText="Phone" width="110" />
                  <ColumnDirective field="address" headerText="Address" width="150" clipMode="EllipsisWithTooltip" />
                  <ColumnDirective field="email" headerText="Email" width="150" clipMode="EllipsisWithTooltip" />
                  <ColumnDirective field="joiningDate" headerText="Joining Date" width="100" />
                  <ColumnDirective field="status" headerText="Status" width="90" />
                  <ColumnDirective
                    field="subjects"
                    headerText="Subjects"
                    width="200"
                    template={(props) => (
                      <ul className="m-0 p-0" style={{ listStyleType: 'none' }}>
                        {props.subjects.map((sub) => (
                          <li key={sub.id}>
                            {sub.name} ({sub.code})
                          </li>
                        ))}
                      </ul>
                    )}
                  />
                </ColumnsDirective>
                <Inject
                  services={[Sort, Filter, ExcelExport, PdfExport, Toolbar, Print, Page, Search]}
                />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TeacherDisplayTeacher;
