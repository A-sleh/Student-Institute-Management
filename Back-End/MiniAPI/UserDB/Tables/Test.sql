CREATE TABLE [dbo].[Test]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Title] NVARCHAR(100),
	[ReportId] int,
	[SubjectId] int,
	[TestType] NVARCHAR(30),
	[Date] date,
	[CorrectionDate] date,
	CONSTRAINT Test_Report_Fk FOREIGN KEY(ReportId) REFERENCES Report(Id) ON DELETE SET NULL,
	CONSTRAINT Test_Subject_Fk FOREIGN KEY(SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE,
	CONSTRAINT TestType_Enum CHECK (TestType IN ('quiz', 'exam'))
)
