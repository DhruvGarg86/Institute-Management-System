import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function DisplayStudent() {


    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-9 admin-dashboard-second p-4">

                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayStudent;
