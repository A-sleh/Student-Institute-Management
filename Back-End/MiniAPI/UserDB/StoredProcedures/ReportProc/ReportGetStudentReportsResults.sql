CREATE PROCEDURE [dbo].[ReportGetStudentReportsResults]
	@studentId int
AS
	SELECT r.Id, r.ReportTitle, r.StartDate, t.TestType,
	SUM(ts.Mark) as mark,
	(SELECT SUM(MaximumMark) FROM Subject s JOIN Test ts ON s.Id = ts.SubjectId WHERE ts.ReportId = r.Id AND ts.TestType = t.TestType) as totalMark,
	SUM(ts.Mark)*100/(SELECT SUM(MaximumMark) FROM Subject s JOIN Test ts ON s.Id = ts.SubjectId WHERE ts.ReportId = r.Id AND ts.TestType = t.TestType) as markPercentage
	FROM Test t
	JOIN Report r ON t.ReportId = r.Id
	LEFT JOIN TestMark ts ON t.Id = ts.TestId
	LEFT JOIN Student s ON ts.StudentId = s.id
	JOIN Class c ON s.classId = c.id
	WHERE s.id = @studentId
	GROUP BY r.Id, r.ReportTitle, r.StartDate, t.TestType;
RETURN 0
