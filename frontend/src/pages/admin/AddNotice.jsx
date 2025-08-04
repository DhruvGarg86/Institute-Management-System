import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { RichTextEditorComponent, Toolbar, HtmlEditor, Inject, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { useRef, useState } from 'react';
import { addNoticeByAdmin } from '../../services/Admin/Notices';

function AddNotice() {
    const [role, setRole] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const editorRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const descValue = editorRef.current.getHtml();

        try {
            // Upload file if present
            // let uploadFilePath = null;
            // if (file) {
            //     uploadFilePath = await uploadNoticeFile(file);
            // }

            const noticeData = {
                adminId: 1,
                audience: role,
                title: title,
                date: new Date().toISOString().split('T')[0],
                description: descValue,
                // filePath: uploadFilePath || null
            };

            await addNoticeByAdmin(noticeData);
            toast.success('Notice added successfully!');

            setTitle('');
            setRole('');
            setFile(null);
            editorRef.current.value = '';
            editorRef.current.dataBind();
        } catch (error) {
            toast.error('Failed to add notice');
            console.log("Error: ", error);
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
                                    <select name="role" className="form-select" required value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="STUDENT">Students</option>
                                        <option value="TEACHER">Teachers</option>
                                        <option value="ALL">All</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input name="title" type="text" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                            ref={editorRef}
                                            toolbarSettings={{
                                                items: [
                                                    'Bold', 'Italic', 'Underline', 'StrikeThrough', 'LowerCase',
                                                    'UpperCase', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList'
                                                ]
                                            }}>
                                            <Inject services={[Toolbar, HtmlEditor, QuickToolbar]} />
                                        </RichTextEditorComponent>
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="mb-3">
                                    <label className="form-label">Attach PDF</label>
                                    <input
                                        type="file"
                                        accept=".pdf, image/*"
                                        className="form-control"
                                        onChange={(e) => setFile(e.target.files[0])}
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
