import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getCourseById, updateCourseById } from '../../services/Admin/Course';
import { getAllSubjects, getAllTeachers } from '../../services/Admin/Course';
import { useNavigate, useParams } from 'react-router-dom';

function EditCoursePage() {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id);

  const [course, setCourse] = useState(null);
  const [courseInfo, setCourseInfo] = useState({
    courseName: '',
    description: '',
    duration: 0,
    startDate: today,
    endDate: '',
    maxStudents: 0,
    fees: 0,
    subjects: [{ subject: '', teacher: '' }],
  });

  const [subjectsList, setSubjectsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const [subjects, teachers] = await Promise.all([
          getAllSubjects(),
          getAllTeachers()
        ]);
        setSubjectsList(subjects);
        setTeachersList(teachers);
      } catch (error) {
        // console.error('Error fetching metadata:', error);
        toast.error('Failed to load subjects or teachers');
      }
    };
    fetchMetaData();
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getCourseById(id);
        setCourse(response);
      } catch (error) {
        toast.error('Unable to load course details');
        // console.error('Error fetching course:', error);
      }
    };
    getCourses();
  }, [id]);

  useEffect(() => {
    if (course) {
      const mappedSubjects = course.mappings?.map((map) => ({
        subject: map.subjectName || '',
        teacher: map.teacherName || '',
      })) || [];

      setCourseInfo({
        courseName: course.name || '',
        description: course.description || '',
        duration: parseInt(course.duration) || 0,
        startDate: course.startDate || today,
        endDate: course.endDate || '',
        maxStudents: course.maxStudents || 0,
        fees: course.courseFees || 0,
        subjects: mappedSubjects.length > 0 ? mappedSubjects : [{ subject: '', teacher: '' }],
      });
    }
  }, [course, today]);

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

  const getSubjectIdByName = (name) => {
    return subjectsList.find(s => s.name === name)?.id || 0;
  };

  const getTeacherIdByName = (name) => {
    return teachersList.find(t => t.name === name)?.id || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: courseId,
      name: courseInfo.courseName,
      description: courseInfo.description,
      duration: `${courseInfo.duration} months`,
      startDate: courseInfo.startDate,
      endDate: courseInfo.endDate,
      courseFees: courseInfo.fees,
      maxStudents: courseInfo.maxStudents,
      status: 'ACTIVE',
      courseSubjectTeachers: courseInfo.subjects.map((sub) => ({
        name: sub.subject,
        subjectId: getSubjectIdByName(sub.subject),
        teacherName: sub.teacher,
        teacherId: getTeacherIdByName(sub.teacher)
      })),

    };
    // console.log("Payload being sent to updateCourseById:", payload);

    try {
      await updateCourseById(courseId, payload);
      toast.success("Course updated successfully!");
      navigate('/admin/display-courses');
    } catch (error) {
      // console.error("Update failed:", error);
      toast.error("Failed to update course.");
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
            <h2 className="text-primary mb-3 fw-bold admin-add-student-heading">
              Edit Course
            </h2>

            <div className="container-fluid mt-2 d-flex justify-content-center">
              <Card className="p-4 shadow" style={{ width: '100%' }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="courseName"
                      value={courseInfo.courseName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

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

                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Duration (months)</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={courseInfo.duration}
                        onChange={handleChange}
                        min={1}
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

                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Max Students</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxStudents"
                        value={courseInfo.maxStudents}
                        onChange={handleChange}
                        min={1}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Fees (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="fees"
                        value={courseInfo.fees}
                        onChange={handleChange}
                        min={0}
                      />
                    </Col>
                  </Row>

                  <hr />
                  <h5>Subjects and Teachers</h5>

                  {courseInfo.subjects.map((item, index) => (
                    <Row key={index} className="mb-2">
                      <Col md={5}>
                        <Form.Select
                          value={item.subject}
                          onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                          required
                        >
                          <option value="">Select Subject</option>
                          {subjectsList.map((subj) => (
                            <option key={subj.id} value={subj.name}>{subj.name}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={5}>
                        <Form.Select
                          value={item.teacher}
                          onChange={(e) => handleSubjectChange(index, 'teacher', e.target.value)}
                          required
                        >
                          <option value="">Select Teacher</option>
                          {teachersList.map((teacher) => (
                            <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
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

                  <div className="text-end mb-3">
                    <Button variant="primary" onClick={addSubjectField}>
                      + Add Subject
                    </Button>
                  </div>

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
