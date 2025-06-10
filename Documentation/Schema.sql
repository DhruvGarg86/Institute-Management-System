DROP DATABASE IF EXISTS INSTITUTE_MANAGEMENT;

CREATE DATABASE INSTITUTE_MANAGEMENT;

USE INSTITUTE_MANAGEMENT;

-- Admin Table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    address VARCHAR(255),
    gender ENUM('Male', 'Female'),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL
);

-- Student Table
CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    dob DATE,
    joining_date DATE,
    address VARCHAR(255),
    gender ENUM('Male', 'Female'),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL
);

-- Teacher Table
CREATE TABLE teacher (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    salary DECIMAL(10,2),
    address VARCHAR(255),
    gender ENUM('Male', 'Female'),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    joining_date DATE,
    resignation_date DATE NULL,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL
);

-- Course Table
CREATE TABLE course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100),
    course_description TEXT,
    course_duration VARCHAR(50),
    course_starting_date DATE,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL
);

-- Subject Table
CREATE TABLE subject (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100),
    course_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Attendance Table
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    teacher_id INT,
    month_year DATE,
    present_days INT,
    absent_days INT,
    total_working_days INT,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((present_days / total_working_days) * 100) STORED,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);

-- Notice Table
CREATE TABLE notice (
    notice_id INT PRIMARY KEY AUTO_INCREMENT,
    notice_date DATE,
    notice_title VARCHAR(200),
    notice_description TEXT,
    notice_status ENUM('Students', 'Teachers', 'All'),
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL
);

-- Fee Table
CREATE TABLE fee (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    total_amount DECIMAL(10,2),
    amount_paid DECIMAL(10,2),
    remaining_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - amount_paid) STORED,
    status ENUM('Paid', 'Unpaid', 'Partial'),
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Teacher-Course Mapping Table
CREATE TABLE teacher_course_mapping (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT,
    course_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Teacher-Subject Mapping Table
CREATE TABLE teacher_subject_mapping (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT,
    subject_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

-- Student-Course Enrollment Table
CREATE TABLE student_course_enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Student-Notice Mapping Table
CREATE TABLE student_notice_mapping (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    notice_id INT,
    student_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

-- Teacher-Notice Mapping Table
CREATE TABLE teacher_notice_mapping (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    notice_id INT,
    teacher_id INT,
    curr_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    x1 VARCHAR(255) NULL,
    x2 VARCHAR(255) NULL,
    x3 VARCHAR(255) NULL,
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);



