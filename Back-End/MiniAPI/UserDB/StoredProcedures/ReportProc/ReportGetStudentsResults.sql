CREATE PROCEDURE [dbo].[ReportGetStudentsResults]
	@reportId int,
	@classId int null
AS
	SELECT s.id as StudentId, s.name, s.lastName, 
	c.id as ClassId, c.title,
	tmr.Id as ReportId,
	SUM(tmr.mark) as Mark,
	SUM(tmr.totalMark) as TotalMark,
	LEFT(SUM(tmr.mark*100.0)/SUM(tmr.totalMark), 5) as markPercent
	FROM TestsMarksForEachReport tmr 
	JOIN Student s ON tmr.StudentId = s.Id
	JOIN Class c ON s.classId = c.id
	WHERE tmr.TestType <> 'quiz' AND tmr.Id = @reportId AND (@classId is NULL OR c.id = @classId)
	GROUP BY s.id, name, lastName, c.id, c.title, tmr.Id
RETURN 0
