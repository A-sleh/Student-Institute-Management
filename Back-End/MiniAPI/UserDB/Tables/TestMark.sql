CREATE TABLE [dbo].[TestMark]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[StudentId] INT,
	[TestId] INT,
	[Mark] INT,
	CONSTRAINT TestMark_Student_Fk FOREIGN KEY(StudentId) REFERENCES student(Id),
	CONSTRAINT TestMark_Test_Fk FOREIGN KEY(TestId) REFERENCES test(Id)
)
