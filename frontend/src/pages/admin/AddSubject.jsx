import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddSubject = () => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!subjectData.name) newErrors.name = 'Subject name is required';
    if (!subjectData.code) newErrors.code = 'Subject code is required';
    if (!subjectData.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // TODO: Send subjectData to backend
      console.log('Subject Added:', subjectData);
      toast.success('Subject added successfully!', { autoClose: 5000 });
      setSubjectData({ name: '', code: '', description: '' });
    }
  };

  return (
    <div className="container-fluid mt-4 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h4 className="mb-3 text-center">Add Subject</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={subjectData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={subjectData.code}
              onChange={handleChange}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={subjectData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" type="submit">
              Add Subject
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddSubject;
