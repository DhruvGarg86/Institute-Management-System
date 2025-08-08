import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { RichTextEditorComponent, Toolbar, HtmlEditor, Inject, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { useRef, useState } from 'react';
import { submitNotice, uploadPdf } from '../../services/Admin/Notices';
import { useNavigate } from 'react-router-dom';
import { getAdminIdFromToken } from '../../services/Admin/Profile';
import { config } from '../../services/config';

function AddNotice() {

    const id = getAdminIdFromToken();

    const [notice, setNotice] = useState({
        adminId: id,
        audience: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        filePath: '',
    });


    const editorRef = useRef(null);
    const navigate = useNavigate();

    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const res = await uploadPdf(file);
                const noticeUrl = `${config.serverUrl}${res.fileName}`;
                setNotice(prev => ({ ...prev, filePath: noticeUrl }));
                toast.success("PDF uploaded successfully");
            } catch (error) {
                console.log(error);
                toast.error("PDF upload failed");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const descriptionValue = editorRef.current.getHtml();

        try {
            const updatedNotice = {
                ...notice,
                description: descriptionValue,
            };

            await submitNotice(updatedNotice);
            toast.success("Notice added successfully");
            editorRef.current.value = '';
            editorRef.current.dataBind();
            navigate("/admin/display-notices");
        } catch (error) {
            console.log(error);
            toast.error("Unable to add notice");
        }
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
                                    <label className="form-label">Role</label>
                                    <select
                                        name="audience"
                                        className="form-select"
                                        required
                                        value={notice.audience}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Audience</option>
                                        <option value="STUDENT">Students</option>
                                        <option value="TEACHER">Teachers</option>
                                        <option value="ALL">All</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="form-control"
                                        required
                                        value={notice.title}
                                        onChange={handleChange}
                                    />
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
                                    <RichTextEditorComponent
                                        ref={editorRef}
                                        toolbarSettings={{
                                            items: [
                                                'Bold', 'Italic', 'Underline', 'StrikeThrough', 'LowerCase',
                                                'UpperCase', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList'
                                            ]
                                        }}
                                    >
                                        <Inject services={[Toolbar, HtmlEditor, QuickToolbar]} />
                                    </RichTextEditorComponent>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Attach PDF</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="form-control"
                                        onChange={handlePdfUpload}
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
