CREATE TABLE [dbo].[Class]
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	title VARCHAR(50),
	capacity INT,
	gender VARCHAR(10) CHECK (gender IN ('male','female')),
	gradeId int,
	CONSTRAINT fk_class_grade FOREIGN KEY(gradeId) REFERENCES Grade(gradeId)
);