
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { RichTextEditorComponent, Toolbar, HtmlEditor, Inject } from '@syncfusion/ej2-react-richtexteditor';

function AddNotice() {

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success("Notice added successfully");
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-7-5 admin-dashboard-second p-4 admin-notice-box">
                        <h2 className="mb-2 fw-bold text-primary">Manage Notices</h2>
                        <div className="card p-3 shadow-sm mb-5 admin-add-notice-box">
                            <h3 className="mb-1 mx-auto fw-bold">New Notice</h3>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label className="form-label">Notice Status</label>
                                    <select name="status" className="form-select" required>
                                        <option value="">Select Status</option>
                                        <option value="Students">Students</option>
                                        <option value="Teachers">Teachers</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input name="title" type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input
                                        name="date"
                                        type="text"
                                        className="form-control"
                                        value={new Date().toLocaleDateString('en-GB')}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <div name="description">
                                        <RichTextEditorComponent
                                            toolbarSettings={{
                                                items: [
                                                    'Bold', 'Italic', 'Underline', 'StrikeThrough', 'FontName', 'FontSize', 'LowerCase',
                                                    'UpperCase', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList']
                                            }}>
                                            <Inject services={[Toolbar, HtmlEditor]} />
                                        </RichTextEditorComponent>
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Attach PDF</label>
                                    <input
                                        type="file"
                                        accept=".pdf, image/*"
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn admin-add-notice-button">Add Notice</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNotice;
