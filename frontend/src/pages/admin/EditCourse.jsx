import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCourseById } from '../../services/Admin/Course';
import { useParams } from 'react-router-dom';

function EditCoursePage() {
  const today = new Date().toISOString().split('T')[0];
  const { id } = useParams();
  const [course, setCourse] = useState();

  const getCourses = async (id) => {
    try {
      const response = await getCourseById(id);
      setCourse(response);
    } catch (error) {
      toast.error('Unable to load course details');
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    getCourses(id);
  }, [id]);

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

  const availableSubjects = ['Math', 'Science', 'English', 'Programming'];
  const availableTeachers = ['Alice', 'Bob', 'Charlie', 'Dave'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated:', courseInfo);
    toast.success('Course updated successfully!', { autoClose: 5000 });
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
                    />
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
                    />
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
                      />
                    </Col>
                    <Col>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        min={today}
                        value={courseInfo.startDate}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={courseInfo.endDate}
                        disabled
                      />
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
                      />
                    </Col>
                    <Col>
                      <Form.Label>Fees (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="fees"
                        value={courseInfo.fees}
                        onChange={handleChange}
                      />
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
                        >
                          <option value="">Select Subject</option>
                          {availableSubjects.map((subj) => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={5}>
                        <Form.Select
                          value={item.teacher}
                          onChange={(e) => handleSubjectChange(index, 'teacher', e.target.value)}
                        >
                          <option value="">Select Teacher</option>
                          {availableTeachers.map((teacher) => (
                            <option key={teacher} value={teacher}>{teacher}</option>
                          ))}
                        </Form.Select>
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
