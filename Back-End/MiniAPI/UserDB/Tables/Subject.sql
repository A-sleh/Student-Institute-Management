CREATE TABLE [dbo].[Subject]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Subject] VARCHAR(50),
	[MaximumMark] INT NOT NULL,
	[gradeId] int,
	CONSTRAINT fk_subject_grade FOREIGN KEY(gradeId) REFERENCES Grade(gradeId)
)
