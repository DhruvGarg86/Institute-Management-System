import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
  const today = new Date().toISOString().split('T')[0];

  const [courseInfo, setCourseInfo] = useState({
    courseName: '',
    description: '',
    duration: 1,
    startDate: today,
    endDate: '',
    maxStudents: '',
    fees: '',
    subjects: [{ subject: '', teacher: '' }],
  });

  const [errors, setErrors] = useState({});

  // Dummy data for now (can be fetched from backend later)
  const availableSubjects = ['Math', 'Science', 'English', 'Programming'];
  const availableTeachers = ['Alice', 'Bob', 'Charlie', 'Dave'];

  // Auto-update End Date based on Start Date + Duration
  useEffect(() => {
    if (courseInfo.startDate && courseInfo.duration) {
      const start = new Date(courseInfo.startDate);
      start.setMonth(start.getMonth() + parseInt(courseInfo.duration));
      const endDate = start.toISOString().split('T')[0];
      setCourseInfo((prev) => ({ ...prev, endDate }));
    }
  }, [courseInfo.startDate, courseInfo.duration]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle subject-teacher mapping
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...courseInfo.subjects];
    updatedSubjects[index][field] = value;
    setCourseInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  // Add/Remove subjects dynamically
  const addSubjectField = () => {
    setCourseInfo((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { subject: '', teacher: '' }],
    }));
  };

  const removeSubjectField = (index) => {
    const updatedSubjects = [...courseInfo.subjects];
    updatedSubjects.splice(index, 1);
    setCourseInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    const { courseName, description, duration, startDate, endDate, maxStudents, fees, subjects } = courseInfo;

    if (!courseName) newErrors.courseName = 'Required';
    if (!description) newErrors.description = 'Required';
    if (!duration || isNaN(duration) || duration < 1) newErrors.duration = 'Minimum duration is 1 month';
    if (!startDate || startDate < today) newErrors.startDate = 'Must be today or in the future';

    if (!endDate) {
      newErrors.endDate = 'Required';
    } else {
      const expectedEnd = new Date(startDate);
      expectedEnd.setMonth(expectedEnd.getMonth() + parseInt(duration));
      const selectedEnd = new Date(endDate);
      if (
        expectedEnd.getFullYear() !== selectedEnd.getFullYear() ||
        expectedEnd.getMonth() !== selectedEnd.getMonth() ||
        expectedEnd.getDate() !== selectedEnd.getDate()
      ) {
        newErrors.endDate = `End date must be exactly ${duration} month(s) from start date`;
      }
    }

    if (!maxStudents || maxStudents <= 0) newErrors.maxStudents = 'Enter a positive number';
    if (!fees || fees <= 0) newErrors.fees = 'Enter a valid fee';

    const usedSubjects = new Set();
    const usedTeachers = new Set();

    subjects.forEach((item, i) => {
      if (!item.subject) newErrors[`subject-${i}`] = 'Select subject';
      if (!item.teacher) newErrors[`teacher-${i}`] = 'Select teacher';

      if (usedSubjects.has(item.subject)) {
        newErrors[`subject-${i}`] = 'Subject already assigned';
      } else {
        usedSubjects.add(item.subject);
      }

      if (usedTeachers.has(item.teacher)) {
        newErrors[`teacher-${i}`] = 'Teacher already assigned';
      } else {
        usedTeachers.add(item.teacher);
      }
    });

    return newErrors;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Submitted:', courseInfo);
      toast.success('Course added successfully!', { autoClose: 5000 });
      // TODO: Send courseInfo to backend API
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

                {/* ✅ Course Name & Description Side by Side */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="courseName"
                        value={courseInfo.courseName}
                        onChange={handleChange}
                        isInvalid={!!errors.courseName}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.courseName}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.description}
                        rows={1}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Duration, Start Date, End Date */}
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration <sup>(Months)</sup></Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={courseInfo.duration}
                        onChange={handleChange}
                        isInvalid={!!errors.duration}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.duration}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.startDate}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.endDate}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Max Students & Fees */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Students</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxStudents"
                        value={courseInfo.maxStudents}
                        onChange={handleChange}
                        isInvalid={!!errors.maxStudents}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maxStudents}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fees (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="fees"
                        value={courseInfo.fees}
                        onChange={handleChange}
                        isInvalid={!!errors.fees}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fees}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                {/* Subjects and Teachers */}
                <h5 className="text-center fw-bold mb-3">Subjects and Teachers</h5>
                {courseInfo.subjects.map((item, index) => (
                  <Row key={index} className="mb-2">
                    <Col md={5}>
                      <Form.Select
                        value={item.subject}
                        onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                        isInvalid={!!errors[`subject-${index}`]}
                        size="sm"
                      >
                        <option value="">Select Subject</option>
                        {availableSubjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors[`subject-${index}`]}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={5}>
                      <Form.Select
                        value={item.teacher}
                        onChange={(e) => handleSubjectChange(index, 'teacher', e.target.value)}
                        isInvalid={!!errors[`teacher-${index}`]}
                        size="sm"
                      >
                        <option value="">Select Teacher</option>
                        {availableTeachers.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors[`teacher-${index}`]}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={2} className="d-grid">
                      {index === 0 ? (
                        <Button variant="primary" size="sm" onClick={addSubjectField}>
                          + Add
                        </Button>
                      ) : (
                        <Button variant="danger" size="sm" onClick={() => removeSubjectField(index)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                {/* Submit Button */}
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
