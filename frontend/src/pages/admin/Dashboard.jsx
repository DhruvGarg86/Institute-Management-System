import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-3 admin-dashboard-first">
            <Sidebar />
          </div>
          <div className="col-9 container-fluid admin-dashboard-second">
            <div className="row admin-dashboard-second-row1">
              <div className="col row1-first">
                <h3>Total Students</h3>
              </div>
              <div className="col row1-second">
                <h3>Total Teachers</h3>
              </div>
              <div className="col row1-third">
                <h3>Total Courses</h3>
              </div>
            </div>
            <div className="row admin-dashboard-second-row2">
              <div className="col row1-first">a</div>
              <div className="col row1-second">b</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
