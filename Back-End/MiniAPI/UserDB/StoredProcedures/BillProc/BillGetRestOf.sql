﻿CREATE PROCEDURE [dbo].[BillGetRestOf]
	@Type varchar(5)
AS
	IF(@Type = 'in')
	SELECT (SUM(s.billRequired) - (SELECT SUM(b.Amount) FROM Bill b WHERE b.StudentId is not null))
	FROM Student s
	ELSE IF(@Type = 'out')
	SELECT SUM(ts.Salary) - 
	(SELECT SUM(b.Amount) FROM Bill b WHERE b.TeacherId is not null )
	FROM Teacher t
	JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	JOIN SubTeachClass tss ON ts.Id = tss.TeachSubId
	ELSE
	THROW 55000, 'Invalied Parameter', 1;

RETURN 0