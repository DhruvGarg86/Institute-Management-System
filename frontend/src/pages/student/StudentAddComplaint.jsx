import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../services/Student/StudentService";
import axios from "axios";
import { config } from "../../services/config";
import { toast } from "react-toastify";

function StudentComplaintForm({ onClose }) {
  const [description, setDescription] = useState("");

  const studentId = getUserIdFromToken();
  const [requiredId, setRequiredId] = useState('');
  const [complaintId, setComplaintId] = useState('');

  const getrequiredId = async (studentId) => {
    try {
      const response = await axios.get(
        `${config.serverUrl}/student/dotnet/${studentId}`
      );
      setRequiredId(response.data);
    } catch (error) {
      // console.error("Error fetching requiredId:", error);
    }
  }

  useEffect(() => {
    getrequiredId(studentId);
  }, [studentId]);


  const addComplaint = async () => {
    const complaint = {
      description: description,
    };

    const url = `http://localhost:5045/api/StudentComplaint/${requiredId}`;
    // console.log("POST URL:", url);

    try {
      const response = await axios.post(url, complaint);
      // console.log("Complaint added successfully:", response.data);
      const id = response.data.complaintId;
      setComplaintId(id);
      toast.success("Complaint added successfully, Complaint ID: " + id);
      onClose();
    } catch (error) {
      // console.error("Error adding complaint:", error);
      toast.error("Error adding complaint.");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requiredId) {
      toast.error("Please wait, student ID is still loading.");
      return;
    }

    await addComplaint();
    // console.log("Complaint DTO to send:", { description });
  };



  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Add Complaint</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Describe your complaint"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentComplaintForm;
