CREATE TABLE [dbo].[student]
(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(30),
	lastName VARCHAR(30),
	fatherName VARCHAR(30),
	missedDays INT DEFAULT 0,
	birthdate DATE,
	phone CHAR(15),
	classId INT,
	billRequired DECIMAL(18,2),
	CONSTRAINT fk_class FOREIGN KEY(classId) REFERENCES class(id) ON UPDATE CASCADE ON DELETE SET NULL,
);