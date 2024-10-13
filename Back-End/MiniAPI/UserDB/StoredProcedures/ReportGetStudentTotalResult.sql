CREATE PROCEDURE [dbo].[ReportGetStudentTotalResult]
	@reportId int,
	@studentId int
AS
	SELECT SUM(ts.Mark) as mark,
	(SELECT SUM(MaximumMark) FROM Subject s JOIN Test t ON s.id = t.SubjectId WHERE t.ReportId = 1) as totalMark,
	SUM(ts.Mark)*100/(SELECT SUM(MaximumMark) FROM Subject s JOIN Test t ON s.id = t.SubjectId WHERE t.ReportId = 1) as markPercentage
	FROM Test t
	LEFT JOIN TestMark ts ON t.Id = ts.TestId
	LEFT JOIN Student s ON ts.StudentId = s.id
	JOIN Class c ON s.classId = c.id
	WHERE t.ReportId = @reportId 
	AND s.id = @studentId
	AND t.TestType <> 'quiz';
RETURN 0
