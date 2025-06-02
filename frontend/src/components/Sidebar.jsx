import React from 'react';

function Sidebar() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="accordion"
        id="accordionPanelsStayOpenExample"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >

        {/* Dashboard */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Dashboard
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">{/* Dashboard content here */}</div>
          </div>
        </div>

        {/* Student */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Student
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">{/* Student content here */}</div>
          </div>
        </div>

        {/* Teacher */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Teacher
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">{/* Teacher content here */}</div>
          </div>
        </div>

        {/* Courses */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Courses
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">{/* Courses content here */}</div>
          </div>
        </div>

        {/* Notices */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Notices
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">{/* Notices content here */}</div>
          </div>
        </div>

        {/* Profile - pinned at bottom */}
        <div className="accordion-item" style={{ marginTop: 'auto' }}>
          <h2 className="accordion-header" id="headingSix">
            <button className="accordion-button sidebar-profile" type="button">
              Profile
            </button>
          </h2>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
