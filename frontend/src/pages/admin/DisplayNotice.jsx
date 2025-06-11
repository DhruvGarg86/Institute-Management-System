import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function DisplayNotice() {
    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-9 admin-dashboard-second admin-display-notice p-4">
                        <h2 className="mb-4 fw-bold text-primary">All Notices</h2>
                        <div className="notice-container">

                            <div className="notice-card">
                                <div className="notice-header">
                                    <h5 className='fw-bold ms-2 mb-4'>Holiday Notice</h5>
                                    <span className="notice-date me-3">2025-08-15</span>
                                </div>
                                <div className="notice-description">
                                    College will remain closed on Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam pariatur accusantium atque saepe recusandae ipsum, perspiciatis omnis id inventore voluptas a quia et accusamus quod, commodi vitae dolor quo eos. 15th Augustollege will remain closed on Lorem ipsum dolor sit amet...
                                </div>
                            </div>

                            <div className="notice-card">
                                <div className="notice-header">
                                    <h5 className='fw-bold ms-2 mb-4'>Exam Schedule</h5>
                                    <span className="notice-date me-3">2025-09-20</span>
                                </div>
                                <div className="notice-description">
                                    Mid-sem exams start from 20th September.
                                </div>
                            </div>

                            <div className="notice-card">
                                <div className="notice-header">
                                    <h5 className='fw-bold ms-2 mb-4'>Seminar</h5>
                                    <span className="notice-date me-3">2025-10-01</span>
                                </div>
                                <div className="notice-description">
                                    AI Seminar on 1st October in the auditorium.
                                </div>
                            </div>

                            <div className="notice-card">
                                <div className="notice-header">
                                    <h5 className='fw-bold ms-2 mb-4'>Assignment</h5>
                                    <span className="notice-date me-3">2025-07-05</span>
                                </div>
                                <div className="notice-description">
                                    Submit your Data Structures assignment by 5th July.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default DisplayNotice;
