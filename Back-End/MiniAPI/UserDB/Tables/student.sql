CREATE TABLE [dbo].[Student]
(
	id INT PRIMARY KEY IDENTITY(1,1),
	name NVARCHAR(30),
	lastName NVARCHAR(30),
	fatherName NVARCHAR(30),
	missedDays INT DEFAULT 0,
	birthdate DATE,
	phone NVARCHAR(15),
	classId INT,
	billRequired DECIMAL(18,2),
	CONSTRAINT fk_class FOREIGN KEY(classId) REFERENCES Class(id) ON UPDATE CASCADE ON DELETE SET NULL,
);