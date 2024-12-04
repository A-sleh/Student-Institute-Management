CREATE PROCEDURE [dbo].[ReportGetStudentAvg]
	@type varchar(30),
	@reportId int null,
	@studentId int null
AS
	SELECT 
	s.id as StudentId,s.name, s.lastName,
	c.id as ClassId, c.title, c.gender, t.TestType,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate,
	SUM(ts.Mark) * 100 / SUM(sb.MaximumMark) as Average
	FROM Student s
	JOIN TestMark ts ON s.id = ts.StudentId
	JOIN Test t ON ts.TestId = t.Id
	JOIN Subject sb ON t.SubjectId = sb.Id
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	JOIN Class c ON s.classId = c.id
	WHERE (r.Id = @reportId or @reportId is null) 
	AND (s.id =  @studentId OR @studentId is null)
	AND (t.TestType = @type OR @type is null)
	GROUP BY s.id, s.name, s.lastName,c.id, c.title, t.TestType, r.Id, r.ReportTitle, r.StartDate, r.FinishDate;
RETURN 0
