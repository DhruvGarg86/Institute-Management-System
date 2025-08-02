# Project Updates

---

## June 2025

### 1st June — Initial Setup
- Launched basic frontend app using **React (JavaScript)** and **Vite**.
- Designed and implemented the admin login page.
- Added comprehensive documentation:
  - Project requirements
  - UML Use Case & ER diagrams
  - Initial database schema
- Uploaded UI screenshots (e.g., login page, admin dashboard).

### 2nd June — Dashboard Progress
- Developed 80% of the Admin Dashboard frontend.
- Updated color scheme from purple/black to blue/white.
- Created and integrated a basic sidebar for the admin panel.

### 4th June — Dashboard Complete
- Finalized the Admin Dashboard layout and sidebar.
- Enabled navigation from login to the dashboard.
- Included admin profile image and logout functionality.

### 7th June — Notices & Profiles
- Integrated notices and top students in the admin dashboard.
- Began development of the profile page.
- Improved navigation for dashboard and profile sections.

### 8th June — Profile & Notices
- Completed the admin profile page.
- Started frontend for the "Add Notice" page.

### 10th June — Schema, Tools & Features
- Migrated from NPM to Yarn for consistent dependency management.
- Switched schema files from `.txt` to `.sql`.
- Finished the "Add Notice" and "Add Student" admin pages.
- Refactored CSS, removing redundancy.
- Integrated `react-toastify` for better UX feedback.
- Sidebar links established to all major pages.
- Added UI screenshots for new admin pages.

### 11th June — Notice Display & UX
- 70% complete: Display Notice functionality.
- Enhanced sidebar.
- Notice dates now auto-filled to the current date (admin cannot edit).

### 14th June — Student Search & File Upload
- Display-all-students page with filters (course, city, name).
- Enhanced profile UI (Instagram icon color).
- Enabled PDF/image upload in Add Notice.

---

## July 2025

### 19th July — Rich Text & Licensing
- Introduced Rich Text Editor (Syncfusion) in "Add Notice".
- Temporary Syncfusion trial license; permanent license in progress.

### 20th July — Marks & Reporting
- Created "Edit Student", "View Marks," overall student marks page (with Syncfusion pie charts & download).
- Integrated Syncfusion grid for marks export (PDF/Excel).
- Custom grid layout adopted for the dashboard.

### 21st July — Leaderboards & Attendance
- Developed "Student Marks Overview" (course toppers & leaderboard).
- Updated "Display Student" layout using Syncfusion grid.
- All admin pages now use an optimized, custom layout.
- Built "Student Attendance" feature.

### 22nd July — Notices, Marks & Fees
- Added "Delete Notice" functionality.
- enabled edit actions for both individual and overall student marks lists.
- Added Syncfusion Enterprise Edition license handling via `.env`.
- Created "Student Fees" overview page for admin.

### 23rd July — Spring Entities
- Established Java Spring entities with standalone fields (relations pending).

### 24th July — Teacher Management
- Added "Add Teacher", "Display Teachers", "Teacher Attendance", and "Edit Teacher" to admin panel.

### 25th July — Courses & Profile Revamp
- Implemented "Add Course" and "Edit Course" for admin.
- Redesigned admin profile page.
- Enhanced readability of the notices display.

### 26th July — Website Launch & Backend
- Released initial landing page.
- Started backend development.

### 27th July — Backend/API (Admin)
- Connected 'Display All Teachers' and 'Display All Teachers with Attendance' API to frontend (via Axios).
- Added a `config.js` for base URL management.
- Released student registration page.
- Added 'TeacherImages' for testing purposes.
- Unified name fields to a single `full_name` on both frontend and backend.

### 28th July — Backend/API (Admin)
- Completed 'Display Notices', 'Delete Notice by ID', and 'Add Notice' APIs for the admin panel.
- Completed 'EditTeacher' API partially, still required to create API to pre-populate Edit Form.

### 31st July — Backend/API - Image Path (Admin)
- Fixed 'Teacher APIs' in Admin Panel with working image path fields;
- Admin 'Notice APIs' are also finalized.

---

## August 2025

### 2nd July — Backend/API - Image Path (Admin)
- Fixed 'Teacher APIs' with dto.
- Added frontend pages for 'Display Complaint' and 'Update Complaint'
- Added 'Subject' and 'Course' pages to the sidebar/admin.
---

*For detailed technical and UI design documentation, see the project’s `/Documentation` folder.*
  