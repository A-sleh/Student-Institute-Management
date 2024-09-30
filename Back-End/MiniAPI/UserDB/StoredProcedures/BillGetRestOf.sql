CREATE PROCEDURE [dbo].[BillGetRestOf]
	@Type varchar(5)
AS
	IF(@Type = 'in')
	SELECT (SUM(s.billRequired) - SUM(b.Amount))
	FROM Student s
	LEFT OUTER JOIN Bill b ON s.id = b.StudentId
	ELSE IF(@Type = 'out')
	SELECT (SUM(ts.Salary) - SUM(b.Amount))
	FROM TeacherSubject ts
	LEFT OUTER JOIN Teacher t ON ts.TeacherId = t.Id
	LEFT OUTER JOIN Bill b ON t.Id = b.TeacherId
	ELSE
	THROW 55000, 'Invalied Parameter', 1;

RETURN 0
