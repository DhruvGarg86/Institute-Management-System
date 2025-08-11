import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast for notifications

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import { Export } from "@syncfusion/ej2-charts";
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
  Edit,
  Page,
  Search,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { config } from "../../services/config";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/Admin/Student";

function StudentMarks() {
  const { id } = useParams();
  
  // List of available subjects for the dropdown
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [marksInput, setMarksInput] = useState([]);
  const [student, setStudent] = useState({});

  const chartRef = useRef(null);
  const gridRef = useRef(null);

  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);


  const getStudents = async (id) => {
    try {
      const response = await getStudentById(id);
      setStudent(response);

      // Convert API marksDetails to chart and table data
      const formattedChartData = response.marksDetails.map((item) => ({
        name: item.subjectName,
        value: item.marksObtained,
      }));

      const formattedTableData = response.marksDetails.map((item) => ({
        Subject: item.subjectName,
        Total: item.totalMarks,
        Obtained: item.marksObtained,
        Percentage: item.percentage,
        Grade: item.grade,
      }));

      setChartData(formattedChartData);
      setTableData(formattedTableData);

      toast.success("Student loaded successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load student");
    }
  };

  useEffect(() => {
    getStudents(id);
  }, [id])

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${config.serverUrl}/admin/student/getSubjects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailableSubjects(response.data);
      } catch (error) {
        // console.error("Failed to fetch subjects", error);
        toast.error("Unable to load subjects.");
      }
    };

    fetchSubjects();
  }, [id]);

  // State for the new marks input

  // Function to handle adding/updating marks and sending to backend
  const handleAddMarks = async () => {
    if (!selectedSubject || marksInput === "") {
      toast.error("Please select a subject and enter marks.");
      return;
    }

    const obtainedMarks = parseInt(marksInput);
    if (isNaN(obtainedMarks) || obtainedMarks < 0 || obtainedMarks > 100) {
      toast.error("Please enter valid marks between 0 and 100.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.serverUrl}/admin/student/addMarks`,
        {
          studentId: student.rollNo,
          subjectName: selectedSubject,
          obtainedMarks: obtainedMarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data)
      // Optional: You can show the response message
      toast.success("Marks added/updated successfully!");

      // Update local state
      const percentage = (obtainedMarks / 100) * 100;
      let grade = "";
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B+";
      else if (percentage >= 60) grade = "B";
      else if (percentage >= 50) grade = "C";
      else grade = "F";

      const newMarkEntry = {
        studentId: student.rollNo,
        Subject: selectedSubject,
        Total: 100,
        Obtained: obtainedMarks,
        Percentage: percentage,
        Grade: grade,
      };

      const existingIndex = marksData.findIndex(
        (item) => item.Subject === selectedSubject
      );
      let updatedMarksData = [...marksData];

      if (existingIndex > -1) {
        updatedMarksData[existingIndex] = newMarkEntry;
      } else {
        updatedMarksData.push(newMarkEntry);
      }

      setMarksData(updatedMarksData);
      setSelectedSubject("");
      setMarksInput("");
    } catch (error) {
      // console.error("Error saving marks:", error);
      toast.error(
        error.response?.data?.message || "Failed to add/update marks."
      );
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
            <h2 className="mb-2 fw-bold text-primary">Marks Overview</h2>
            <div className="card p-3 shadow-sm mb-5 admin-add-notice-box">
              <div className="container">
                {/* First Row: Profile */}
                <div className="row mb-4">
                  <div className="col border rounded mx-2 p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center ms-2">
                      <img
                        src={student.image}
                        alt="Profile"
                        className="rounded-circle me-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h5 className="mb-1 fw-bold">{student.name}</h5>
                        <p className="mb-0 text-muted">
                          <FaEnvelope className="me-2" />
                          {student.email}
                        </p>
                      </div>
                    </div>
                    <div className="me-3 text-md-end">
                      <p className="mb-1">
                        <strong>Roll No:</strong> {id}
                      </p>
                      <p className="mb-1">
                        <strong>DOB:</strong> {student.dob}
                      </p>
                      <p className="mb-1">
                        <strong>Course:</strong> {student.courseName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Row: Add/Update Marks Section */}
                <div className="row mb-4">
                  <div className="col border rounded mx-2 p-3">
                    <h4 className="mb-3 fw-bold text-secondary">
                      Add/Update Marks
                    </h4>
                    <div className="row g-3 align-items-end">
                      <div className="col-md-6">
                        <label htmlFor="subjectSelect" className="form-label">
                          Select Subject
                        </label>
                        <select
                          id="subjectSelect"
                          className="form-select"
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                          <option value="">-- Select Subject --</option>
                          {availableSubjects.map((subject) => (
                            <option key={subject.id || subject.name} value={subject.name}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="marksInput" className="form-label">
                          Marks (out of 100)
                        </label>
                        <input
                          type="number"
                          id="marksInput"
                          className="form-control"
                          value={marksInput}
                          onChange={(e) => setMarksInput(e.target.value)}
                          min="0"
                          max="100"
                          placeholder="e.g., 85"
                        />
                      </div>
                      <div className="col-md-3 d-grid">
                        <button
                          className="btn btn-primary"
                          onClick={handleAddMarks}
                        >
                          Add/Update Marks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Third Row: Marks Table */}
                <div className="row mb-4">
                  <div className="col border rounded mx-2 p-3">
                    <h4 className="mb-3 fw-bold text-secondary">
                      Detailed Marks
                    </h4>
                    <GridComponent
                      ref={gridRef}
                      dataSource={tableData}
                      allowSorting={true}
                      allowExcelExport={true}
                      allowPdfExport={true}
                      allowPaging={true}
                      pageSettings={{ pageSize: 5 }}
                      toolbar={["Search", "ExcelExport", "PdfExport", "Print"]}
                      toolbarClick={(args) => {
                        if (gridRef.current) {
                          if (args.item.id.includes("pdfexport"))
                            gridRef.current.pdfExport();
                          if (args.item.id.includes("excelexport"))
                            gridRef.current.excelExport();
                          if (args.item.id.includes("print"))
                            gridRef.current.print();
                        }
                      }}
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="Subject"
                          headerText="Subject"
                          textAlign="Left"
                          width="100"
                        />
                        <ColumnDirective
                          field="Total"
                          headerText="Total Marks"
                          textAlign="Center"
                          width="80"
                        />
                        <ColumnDirective
                          field="Obtained"
                          headerText="Obtained Marks"
                          textAlign="Center"
                          width="100"
                        />
                        <ColumnDirective
                          field="Percentage"
                          headerText="Percentage (%)"
                          textAlign="Center"
                          width="100"
                        />
                        <ColumnDirective
                          field="Grade"
                          headerText="Grade"
                          textAlign="Center"
                          width="70"
                        />
                      </ColumnsDirective>
                      <Inject
                        services={[
                          Sort,
                          Filter,
                          ExcelExport,
                          PdfExport,
                          Toolbar,
                          Print,
                          Page,
                          Search,
                          Edit,
                        ]}
                      />
                    </GridComponent>
                  </div>
                </div>

                {/* Fourth Row: Pie Chart */}
                <div className="row">
                  <div className="col border rounded mx-2 p-3">
                    <h4 className="mb-3 fw-bold text-secondary">
                      Marks Distribution
                    </h4>
                    <AccumulationChartComponent
                      ref={chartRef}
                      id="pie-chart"
                      title="Subject-wise Marks Distribution"
                      legendSettings={{ visible: true, position: "Right" }}
                      tooltip={{ enable: true }}
                      onClick={() =>
                        chartRef.current.exportModule.export(
                          "PNG",
                          "Student_Marks"
                        )
                      }
                      enableSmartLabels={true}
                    >
                      <Inject
                        services={[
                          PieSeries,
                          AccumulationDataLabel,
                          AccumulationLegend,
                          AccumulationTooltip,
                          Export,
                        ]}
                      />
                      <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective
                          dataSource={chartData}
                          xName="name"
                          yName="value"
                          dataLabel={{
                            visible: true,
                            name: "Percentage",
                            position: "Outside",
                            font: { fontWeight: "600" },
                            connectorStyle: { length: "20px", type: "Curve" },
                          }}
                          innerRadius="20%"
                          startAngle={0}
                          endAngle={360}
                          radius="70%"
                          explode={true}
                          explodeOffset="10%"
                          explodeIndex={0}
                        ></AccumulationSeriesDirective>
                      </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
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