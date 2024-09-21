CREATE PROCEDURE [dbo].[BillGetTotalTeacherSalary]
	@TeacherId int
AS
	SELECT SUM(Salary) as Salary
	FROM TeacherSubject ts
	INNER JOIN SubTeachClass sc ON sc.TeachSubId = ts.Id
	WHERE ts.TeacherId = @TeacherId;
RETURN 0
