﻿CREATE TABLE [dbo].[absence]
(
	[absenceId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[studentId] INT,
	[date] Date,
	CONSTRAINT absence_student FOREIGN KEY(studentId) REFERENCES Student(id),
	CONSTRAINT unq_st_abs UNIQUE(studentId, date) --CHECK
)
