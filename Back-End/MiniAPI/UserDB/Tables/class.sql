CREATE TABLE [dbo].[Class]
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	title NVARCHAR(50),
	capacity INT,
	gender NVARCHAR(10) CHECK (gender IN ('male','female',N'ذكر', N'انثى')),
	gradeId int,
	CONSTRAINT fk_class_grade FOREIGN KEY(gradeId) REFERENCES Grade(gradeId) ON DELETE SET NULL
);