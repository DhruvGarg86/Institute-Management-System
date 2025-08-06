import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllSubjects } from '../../services/Admin/Subject';
import { getAllTeachers } from '../../services/Admin/Teacher';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../services/Admin/Course';

function AddCourse() {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    courseFees: '',
    maxStudents: '',
    courseSubjectTeachers: [
      {
        subjectId: '',
        teacherId: '',
      },
    ],
  });

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getSubjects();
    getTeachers();
  }, []);

  const getSubjects = async () => {
    try {
      const response = await getAllSubjects();
      if (response.length === 0) toast.info("No subjects found");
      setSubjects(response);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load subjects");
    }
  };

  const getTeachers = async () => {
    try {
      const response = await getAllTeachers();
      if (response.length === 0) toast.info("No teachers found");
      setTeachers(response);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load teachers");
    }
  };

  // Auto-calculate End Date based on Start Date + Duration
  useEffect(() => {
    if (courseInfo.startDate && courseInfo.duration) {
      const start = new Date(courseInfo.startDate);
      start.setMonth(start.getMonth() + parseInt(courseInfo.duration));
      const endDate = start.toISOString().split('T')[0];
      setCourseInfo((prev) => ({ ...prev, endDate }));
    }
  }, [courseInfo.startDate, courseInfo.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectTeacherChange = (index, field, value) => {
    const updated = [...courseInfo.courseSubjectTeachers];
    updated[index][field] = value;
    setCourseInfo((prev) => ({ ...prev, courseSubjectTeachers: updated }));
  };

  const addSubjectTeacherField = () => {
    setCourseInfo((prev) => ({
      ...prev,
      courseSubjectTeachers: [...prev.courseSubjectTeachers, { subjectId: '', teacherId: '' }],
    }));
  };

  const removeSubjectTeacherField = (index) => {
    const updated = [...courseInfo.courseSubjectTeachers];
    updated.splice(index, 1);
    setCourseInfo((prev) => ({ ...prev, courseSubjectTeachers: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration = parseInt(courseInfo.duration);
    if (isNaN(duration) || duration <= 0) {
      toast.error("Duration must be a positive number");
      return;
    }
    try {
      await addCourse(courseInfo);
      toast.success("Course added successfully");
      navigate("/admin/display-courses");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add course");
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

          <div className="col-7-5 admin-dashboard-second p-4">
            <h2 className="text-primary mb-3 fw-bold admin-add-student-heading">Add Course</h2>

            <ToastContainer />
            <Card className="shadow p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={courseInfo.name}
                        onChange={handleChange}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={courseInfo.description}
                        onChange={handleChange}
                        rows={1}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration <sub className='text-small'
                      >(Months)</sub></Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={courseInfo.duration}
                        onChange={handleChange}
                        size="sm"
                        min="1"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={courseInfo.startDate}
                        onChange={handleChange}
                        min={today}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={courseInfo.endDate}
                        disabled
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Students</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxStudents"
                        value={courseInfo.maxStudents}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Fees (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="courseFees"
                        value={courseInfo.courseFees}
                        onChange={handleChange}
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr />
                <h5 className="text-center fw-bold mb-3">Subjects and Teachers</h5>
                {courseInfo.courseSubjectTeachers.map((item, index) => (
                  <Row key={index} className="mb-2">
                    <Col md={5}>
                      <Form.Select
                        value={item.subjectId}
                        onChange={(e) => handleSubjectTeacherChange(index, 'subjectId', e.target.value)}
                        size="sm"
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subj) => (
                          <option key={subj.id} value={subj.id}>{subj.name}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={5}>
                      <Form.Select
                        value={item.teacherId}
                        onChange={(e) => handleSubjectTeacherChange(index, 'teacherId', e.target.value)}
                        size="sm"
                        required
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((teach) => (
                          <option key={teach.id} value={teach.id}>{teach.name}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2} className="d-grid">
                      {index === 0 ? (
                        <Button variant="primary" size="sm" onClick={addSubjectTeacherField}>
                          + Add
                        </Button>
                      ) : (
                        <Button variant="danger" size="sm" onClick={() => removeSubjectTeacherField(index)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                <div className="d-flex justify-content-center mt-3">
                  <Button variant="success" type="submit">
                    Add Course
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCourse;
