-- Good for retrieving data from StudentGet/StudentGetAll Proc
-- Gives students and related class
CREATE TYPE [dbo].[StudentClassTableType] AS TABLE
(
	StudentId INT,
	name NVARCHAR(128),
	lastName NVARCHAR(128),
	fatherName NVARCHAR(128),
	birthDate DATE,
	Phone VARCHAR(15),
	BillRequired INT,
	MissedDays INT,
	classId INT,
	title NVARCHAR(128),
	gradeId INT,
	grade NVARCHAR(128),
	gender NVARCHAR(128),
	capacity INT
)
