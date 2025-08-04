import React, { useState } from "react";

function StudentComplaintForm({ onClose }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaint = {
      description: description,
      status: "ACTIVE",
      studentId: 1
    };

    console.log("Complaint DTO to send:", complaint);
    setDescription("");
    onClose();
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
        alignItems: "center"
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
          position: "relative"
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
