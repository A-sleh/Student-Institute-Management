﻿CREATE PROCEDURE [dbo].[ReportGetStudentsResults]
	@reportId int,
	@classId int null
AS
	SELECT s.id as StudentId, s.name, s.lastName, 
	c.id as ClassId, c.title,
	SUM(ts.Mark) as Mark,
	(
		SELECT 
		SUM(MaximumMark) 
		FROM Subject s 
		JOIN Test ts ON s.Id = ts.SubjectId 
		WHERE ts.ReportId = @reportId 
		AND ts.TestType <> 'quiz'
	) 
	as TotalMark
	FROM Test t
	LEFT JOIN TestMark ts ON t.Id = ts.TestId
	LEFT JOIN Student s ON ts.StudentId = s.id
	JOIN Class c ON s.classId = c.id
	WHERE t.ReportId = @reportId 
	AND (s.classId = @classId OR @classId is null)
	AND t.TestType <> 'quiz'
	GROUP BY s.id, name, lastName, c.id, c.title
RETURN 0