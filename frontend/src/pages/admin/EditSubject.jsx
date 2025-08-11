import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectById, updateSubject } from '../../services/Admin/Subject';

const EditSubject = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({
    name: '',
    code: '',
    description: ''
  });

  const getSubject = async () => {
    try {
      const response = await getSubjectById(id);
      setSubject(response);
    } catch (error) {
      // console.error(error);
    }
  }

  useEffect(() => {
    getSubject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSubject(id, subject);
      toast.success("Subject updated successfully");
      navigate("/admin/display-subjects");
    } catch (error) {
      toast.error("Failed to update subject");
      // console.error(error);
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
            <h2 className="text-primary mb-4 fw-bold admin-add-student-heading">Edit Subject</h2>
            <Form className="row g-4 bg-white p-2 rounded admin-add-student-form mt-3" onSubmit={handleSubmit}>

              <Form.Group className="col-md-6">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={subject.name}
                  onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={subject.code}
                  onChange={(e) => setSubject({ ...subject, code: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="col-md-12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  value={subject.description}
                  onChange={(e) => setSubject({ ...subject, description: e.target.value })}
                />
              </Form.Group>

              <div className="col-12 text-center">
                <Button type="submit" className="btn btn-primary px-4 custom-button-primary">
                  Update Subject
                </Button>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubject;
