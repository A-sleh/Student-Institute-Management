﻿CREATE PROCEDURE [dbo].[ReportGetClassAvg]
	@classId int null,
	@reportId int null,
	@type varchar(20) null
AS
	SELECT 
	c.id as ClassId, c.title, c.gender, g.gradeId, g.grade, c.capacity,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate,
	SUM(ts.Mark) * 100 / SUM(sb.MaximumMark) as Average
	FROM Class c
	LEFT OUTER JOIN Student s ON c.id = s.classId
	JOIN TestMark ts ON s.id = ts.StudentId
	JOIN Test t ON ts.TestId = t.Id
	JOIN Subject sb ON t.SubjectId = sb.Id
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId AND c.gradeId = g.gradeId
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	WHERE (r.Id = @reportId or @reportId is null ) 
	AND (c.id = @classId OR @classId is null)
	AND (t.TestType = @type OR @type is null)
	GROUP BY c.id, g.gradeId, g.grade, c.gender, c.capacity, c.title ,r.Id, r.ReportTitle, r.StartDate, r.FinishDate;
RETURN 0
