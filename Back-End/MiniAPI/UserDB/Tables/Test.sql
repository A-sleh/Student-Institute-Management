CREATE TABLE [dbo].[Test]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ReportId] int,
	[SubjectId] int,
	[TestType] varchar(30),
	[Date] date,
	[CorrectionDate] date,
	CONSTRAINT Test_Report_Fk FOREIGN KEY(ReportId) REFERENCES Report(Id),
	CONSTRAINT Test_Subject_Fk FOREIGN KEY(SubjectId) REFERENCES Subject(Id),
	CONSTRAINT TestType_Enum CHECK (TestType IN ('quiz', 'exam', 'revision', 'final'))
)
