import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
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

  // Dummy data for now
  const availableSubjects = ['Math', 'Science', 'English', 'Programming'];
  const availableTeachers = ['Alice', 'Bob', 'Charlie', 'Dave'];

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

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...courseInfo.subjects];
    updatedSubjects[index][field] = value;
    setCourseInfo((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Submitted:', courseInfo);
      toast.success('Course added successfully!', { autoClose: 5000 });
      // TODO: Send courseInfo to backend
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-4">
      <ToastContainer />
      <Card style={{ width: '80%', maxWidth: '800px' }} className="shadow p-4">
        <h3 className="text-center mb-4">Add New Course</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Course Name</Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={courseInfo.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              rows={2}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Duration (months)</Form.Label>
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

          <h5 className="text-center">Subjects and Teachers</h5>
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
                {index > 0 && (
                  <Button variant="danger" size="sm" onClick={() => removeSubjectField(index)}>
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" size="sm" onClick={addSubjectField}>
              + Add Subject
            </Button>
          </div>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit">
              Add Course
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddCourse;
