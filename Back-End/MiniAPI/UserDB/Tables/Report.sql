CREATE TABLE [dbo].[Report]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ReportTitle] VARCHAR(100),
	[StartDate] DATE,
	[FinishDate] DATE
)
