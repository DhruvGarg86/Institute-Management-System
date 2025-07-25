import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const EditSubject = () => {
  const { id } = useParams();

  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Replace with real API call to fetch subject
    const fetchedData = {
      name: 'Mathematics',
      code: 'MATH101',
      description: 'Basic Mathematics for Class 10'
    };
    setSubjectData(fetchedData);
  }, [id]);

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
      // TODO: Update subject in backend
      console.log('Subject Updated:', subjectData);
      toast.success('Subject updated successfully!', { autoClose: 5000 });
    }
  };

  return (
    <div className="container-fluid mt-4 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h4 className="mb-3 text-center">Edit Subject</h4>
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
            <Button variant="primary" type="submit">
              Update Subject
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditSubject;
