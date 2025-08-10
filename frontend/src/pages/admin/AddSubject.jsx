import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addSubject } from '../../services/Admin/Subject';

function AddSubject() {

  const navigate = useNavigate();

  const [subject, setSubject] = useState({
    name: '',
    code: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubject(subject);
      toast.success("Subject added successfully");
      navigate("/admin/display-subjects");
      // console.log('success');
    } catch (error) {
      toast.error("Failed to add subject");
      console.error(error);
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
            <h2 className="mb-4 fw-bold text-primary">Manage Subjects</h2>
            <div className="d-flex justify-content-center">
              <Card className="p-4 shadow w-100" style={{ maxWidth: '1180px' }}>
                <h4 className="mb-3 text-center fw-bold">Add Subject</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject Code</Form.Label>
                    <Form.Control
                      type="number"
                      name="code"
                      onChange={(e) => setSubject({ ...subject, code: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      rows={3}
                      onChange={(e) => setSubject({ ...subject, description: e.target.value })}
                    />
                  </Form.Group>

                  <div className="text-center mt-4">
                    <Button variant="success" type="submit">
                      Add Subject
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

export default AddSubject;
