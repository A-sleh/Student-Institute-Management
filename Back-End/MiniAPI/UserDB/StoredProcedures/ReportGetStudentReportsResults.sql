CREATE PROCEDURE [dbo].[ReportGetStudentReportsResults]
	@studentId int
AS
	SELECT r.Id, r.ReportTitle, r.StartDate,
	SUM(ts.Mark) as mark,
	(SELECT SUM(MaximumMark) FROM Subject s JOIN Test t ON s.Id = t.SubjectId WHERE t.ReportId = 1) as totalMark,
	SUM(ts.Mark)*100/(SELECT SUM(MaximumMark) FROM Subject s JOIN Test t ON s.Id = t.SubjectId WHERE t.ReportId = 1) as markPercentage
	FROM Test t
	JOIN Report r ON t.ReportId = r.Id
	LEFT JOIN TestMark ts ON t.Id = ts.TestId
	LEFT JOIN Student s ON ts.StudentId = s.id
	JOIN Class c ON s.classId = c.id
	WHERE s.id = @studentId
	AND t.TestType <> 'quiz'
	GROUP BY r.Id, r.ReportTitle, r.StartDate;
RETURN 0
