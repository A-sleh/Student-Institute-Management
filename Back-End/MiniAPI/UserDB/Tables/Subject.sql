CREATE TABLE [dbo].[Subject]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Subject] VARCHAR(50),
	[MaximumMark] INT NOT NULL,
	[Grade] varchar(20),
	CONSTRAINT Subject_Grade_Enum CHECK (Grade IN ('bachelor','ninth'))
)
