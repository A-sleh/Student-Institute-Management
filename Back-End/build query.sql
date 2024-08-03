CREATE TABLE class (
id INT IDENTITY(1,1) PRIMARY KEY,
title varchar(50),
capacity int,
gender varchar(10) check (gender in ('male','female')),
grade varchar(10) check (grade in ('bachelor','ninth'))
);

CREATE TABLE student(
id INT PRIMARY KEY IDENTITY(1,1),
student_name VARCHAR(30),
student_last_name VARCHAR(30),
father_name VARCHAR(30),
missed_days INT DEFAULT 0,
birthdate DATE,
phone CHAR(15),
class_id INT,
total_bill_required DECIMAL(18,2),
CONSTRAINT fk_class FOREIGN KEY(class_id) REFERENCES class(id) ON UPDATE CASCADE ON DELETE SET NULL,
);

CREATE TABLE report(
id INT PRIMARY KEY IDENTITY(1,1),
title char(50),
starting_date DATE,
ending_date DATE
);

CREATE TABLE subject (
id INT PRIMARY KEY IDENTITY(1,1),
subject_name VARCHAR(50),
max_mark INT NOT NULL
);

CREATE TABLE test (
id INT PRIMARY KEY IDENTITY(1,1),
report_id INT,
subject_id INT not null,
test_type VARCHAR(15),
test_date DATE,
CONSTRAINT fk_report_id FOREIGN KEY(report_id) REFERENCES report(id) ON UPDATE CASCADE ON DELETE SET NULL,
CONSTRAINT fk_subject_id FOREIGN KEY(subject_id) REFERENCES subject(id),
CONSTRAINT enum_test_type CHECK (test_type IN ('exam', 'quiz', 'revision', 'final'))
);

CREATE TABLE test_mark (
id INT PRIMARY KEY IDENTITY(1,1),
student_id INT not null,
test_id INT not null,
mark INT,
correction_date DATE,
CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id),
CONSTRAINT fk_test_id FOREIGN KEY(test_id) REFERENCES test(id)
);

CREATE TABLE teacher(
id INT PRIMARY KEY IDENTITY(1,1),
name VARCHAR(30),
last_name VARCHAR(30),
phone CHAR(15)
);

CREATE TABLE teaching (
id INT PRIMARY KEY IDENTITY(1,1),
subject_id INT not null,
teacher_id INT not null,
cost INT,
CONSTRAINT fk_subject_to_teaching FOREIGN KEY(subject_id) REFERENCES subject(id) ON UPDATE CASCADE,
CONSTRAINT fk_teacher_to_teaching FOREIGN KEY(teacher_id) REFERENCES teacher(id) ON UPDATE CASCADE
);

CREATE TABLE teaching_class (
id INT PRIMARY KEY IDENTITY(1,1),
class_id INT not null,
teaching_id INT not null,
CONSTRAINT fk_teaching_class FOREIGN KEY(class_id) REFERENCES class(id) ON UPDATE CASCADE,
CONSTRAINT fk_teaching_id FOREIGN KEY(teaching_id) REFERENCES teaching(id)
);

CREATE TABLE bills (
id INT PRIMARY KEY IDENTITY(1,1),
bill_no varchar(20) null,
student INT null,
teacher INT null,
type VARCHAR(3),
date DATE,
amount INT,
note CHAR(200),
CONSTRAINT fk_student_bill FOREIGN KEY(student) REFERENCES student(id),
CONSTRAINT fk_teacher_bill FOREIGN KEY(teacher) REFERENCES teacher(id),
CONSTRAINT enum_type_bill CHECK (type in ('in', 'out')),
CONSTRAINT bill_validation CHECK((student is null and teacher is not null) or
								(student is not null and teacher is null) or 
								(student is null and teacher is null and note is not null))
);