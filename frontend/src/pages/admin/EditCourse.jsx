import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCoursePage() {
  const today = new Date().toISOString().split('T')[0];

  // Dummy existing course data (replace with API later)
  const dummyCourse = {
    courseName: 'Full Stack Development',
    description: 'Learn MERN stack from scratch.',
    duration: 3,
    startDate: today,
    maxStudents: 25,
    fees: 5000,
    subjects: [
      { subject: 'Programming', teacher: 'Alice' },
      { subject: 'Math', teacher: 'Bob' },
    ],
  };

  const [courseInfo, setCourseInfo] = useState({ ...dummyCourse, endDate: '' });
  const [errors, setErrors] = useState({});

  const availableSubjects = ['Math', 'Science', 'English', 'Programming'];
  const availableTeachers = ['Alice', 'Bob', 'Charlie', 'Dave'];

  // ✅ Auto-calculate end date based on duration & start date
  useEffect(() => {
    if (courseInfo.startDate && courseInfo.duration) {
      const start = new Date(courseInfo.startDate);
      start.setMonth(start.getMonth() + parseInt(courseInfo.duration));
      const endDate = start.toISOString().split('T')[0];
      setCourseInfo(prev => ({ ...prev, endDate }));
    }
  }, [courseInfo.startDate, courseInfo.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...courseInfo.subjects];
    updatedSubjects[index][field] = value;
    setCourseInfo(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const addSubjectField = () => {
    setCourseInfo(prev => ({
      ...prev,
      subjects: [...prev.subjects, { subject: '', teacher: '' }],
    }));
  };

  const removeSubjectField = (index) => {
    const updatedSubjects = [...courseInfo.subjects];
    updatedSubjects.splice(index, 1);
    setCourseInfo(prev => ({ ...prev, subjects: updatedSubjects }));
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

    if (!maxStudents || maxStudents <= 0) newErrors.maxStudents = 'Enter a valid number';
    if (!fees || fees <= 0) newErrors.fees = 'Enter a valid fee';

    const usedSubjects = new Set();
    const usedTeachers = new Set();

    subjects.forEach((item, i) => {
      if (!item.subject) newErrors[`subject-${i}`] = 'Required';
      if (!item.teacher) newErrors[`teacher-${i}`] = 'Required';

      if (usedSubjects.has(item.subject)) {
        newErrors[`subject-${i}`] = 'Duplicate subject';
      } else {
        usedSubjects.add(item.subject);
      }

      if (usedTeachers.has(item.teacher)) {
        newErrors[`teacher-${i}`] = 'One teacher can only teach one subject';
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
      console.log('Updated:', courseInfo);
      toast.success('Course updated successfully!', { autoClose: 5000 });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">

          {/* Sidebar */}
          <div className="col-2-5 admin-dashboard-first">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-7-5 admin-dashboard-second p-4">
            <h2 className="text-primary mb-3 fw-bold admin-add-student-heading">
              Edit Course
            </h2>

            {/* Edit Course Form */}
            <div className="container-fluid mt-2 d-flex justify-content-center">
              <Card className="p-4 shadow" style={{ width: '100%' }}>
                <Form onSubmit={handleSubmit}>
                  {/* Course Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="courseName"
                      value={courseInfo.courseName}
                      onChange={handleChange}
                      isInvalid={!!errors.courseName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.courseName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      rows={2}
                      value={courseInfo.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Duration, Start Date, End Date */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Duration (months)</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={courseInfo.duration}
                        onChange={handleChange}
                        isInvalid={!!errors.duration}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.duration}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        min={today}
                        value={courseInfo.startDate}
                        onChange={handleChange}
                        isInvalid={!!errors.startDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={courseInfo.endDate}
                        disabled
                        isInvalid={!!errors.endDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  {/* Max Students & Fees */}
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Max Students</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxStudents"
                        value={courseInfo.maxStudents}
                        onChange={handleChange}
                        isInvalid={!!errors.maxStudents}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maxStudents}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Label>Fees (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="fees"
                        value={courseInfo.fees}
                        onChange={handleChange}
                        isInvalid={!!errors.fees}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fees}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <hr />
                  <h5>Subjects and Teachers</h5>

                  {/* Dynamic Subject Rows */}
                  {courseInfo.subjects.map((item, index) => (
                    <Row key={index} className="mb-2">
                      <Col md={5}>
                        <Form.Select
                          value={item.subject}
                          onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                          isInvalid={!!errors[`subject-${index}`]}
                        >
                          <option value="">Select Subject</option>
                          {availableSubjects.map((subj) => (
                            <option key={subj} value={subj}>{subj}</option>
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
                        >
                          <option value="">Select Teacher</option>
                          {availableTeachers.map((teacher) => (
                            <option key={teacher} value={teacher}>{teacher}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors[`teacher-${index}`]}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={2}>
                        {index > 0 && (
                          <Button variant="danger" onClick={() => removeSubjectField(index)}>
                            Remove
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}

                  {/* Add Subject Button */}
                  <div className="text-end mb-3">
                    <Button variant="primary" onClick={addSubjectField}>
                      + Add Subject
                    </Button>
                  </div>

                  {/* Submit */}
                  <div className="text-center">
                    <Button type="submit" variant="success">
                      Update Course
                    </Button>
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCoursePage;
