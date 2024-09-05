CREATE TABLE [dbo].[Class]
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	title VARCHAR(50),
	capacity INT,
	gender VARCHAR(10) CHECK (gender IN ('male','female')),
	grade VARCHAR(10) CHECK (grade IN ('bachelor','ninth'))
);