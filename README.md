# Updates

## 1st June 2025

### By dhruvGarg
- Added basic frontend app using React(Javascript) and Vite.
- Created admin login page, only frontend part.
- Added Documentation, including project requirements, UML Case diagram, ER diagram, and the schema of the intended DB.
- Added some website UI screenshots, including login page and admin dashboard.

## 2nd June 2025

### By dhruvGarg
- Added 80% implemented frontend of Admin Dashboard.
- Changed color schema from purple black to blue white.
- Created a sidebar for admin, 50% implemented.

## 4th June 2025

### By dhruvGarg
- Completed Admin Dashboard
- Sidebar completed.
- Added navigation to dashboard from login page.
- Profile image, logout added.

## 07th June 2025

### By dhruvGarg
- Added notices and top student to admin dashboard.
- Profile page 50% completed
- Added navigation for dashboard and profile button

## 08th June 2025

### By dhruvGarg
- Completed Profile page.
- Started 'add-notice' page frontend.

## 10th June 2025

### By dhruvGarg
- Switched to Yarn, removed package-lock.json, to avoid inconsistency and mixing of 'npm' and 'yarn'. 
- Changed Schema filetype from .txt to .sql. in 'Documentation Folder'.
- Finished Admin Add Notice page.
- Created Admin Add Student page. (Yet to add image input functionality)
- Updated CSS by removing redundant code.
- Added 'react-toastify', to give visually better response to user.
- Updated Sidebar, mapped links to pages.
- Added screenshots of 'Admin/AddNotice' page and 'Admin/AddStudent' page


## 11th June 2025

### By dhruvGarg
- Added Display Notice, completed 70%.
- Updated sidebar.
- Modified Add Notice such that while inserting a notice, the date of notice is preselected as the current date i.e today, and is non-editable, even for ADMIN(user role).


## 14th June 2025

### By dhruvGarg
- Added Display all students, can search through course, city and name.
- Changed background-color of instagram icon in profile page.
- Added 'upload PDF/Image' functionality in Add Notice Page.

## 19th July 2025

### By dhruvGarg
- Added RichTextEditor via Syncfusion in 'Add Notice' page, to provide better text customization options.
- The Syncfusion is using a 7 day free trial period license, and a request for permanent license is applied, if not approved, syncfusion will be removed. 

## 20th July 2025

### By dhruvGarg
- Created 'EditStudent' page for admin , and linked to edit action button of student display.
- Added 'View Marks' button to list displayed on 'DisplayStudent' page.
- Created 'StudentMarks' page for admin, to show overall marks secured by a student, includes a pie chart via Syncfusion.
- Used PieCharts from Syncfusion to show students marks, and also can download the same.
- Added 'Grid Component' from Syncfusion, providing the admin the funtionality to download students marks in PDF or excel format.
- Changed column size in bootstrap grid to custom size in 'Dashboard' page, will be doing the same change to al the pages after checking for versatility.

## 21th July 2025

### By dhruvGarg
- Created 'StudentMarksOverview' for admin to see each course topper, along with leaderboard using Syncfusion-grid.
- Changed 'DisplayStudent' page to Syncfusiongrid structure.
- Changed layout of every page from 'bootstrap: col-3, col-7' to custom layout.
- Created 'StudentAttendance' page.

## 22th July 2025

### By dhruvGarg
- Added 'Delete' button to 'DisplayNotice' page.
- Added Edit function to list of individual student marks, and overall student marks list.
- Added Syncfusion Enterprise Edition license in .env file
- Added 'StudentFees' page in Admin panel to see which student has paid fees or not.

## 23th July 2025

### By dhruvGarg
- Created basic entities in spring , not containing relations only standalone properties.

## 24th July 2025

### By dhruvGarg
- Created 'AddTeacher' , 'DisplayTeachers', 'TeacherAttendance' and 'EditTeacher' page to admin panel