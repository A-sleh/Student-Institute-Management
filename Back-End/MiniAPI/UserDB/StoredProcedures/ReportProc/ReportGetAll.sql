CREATE PROCEDURE [dbo].[ReportGetAll]
	@classId int null
AS
BEGIN
	SELECT r.Id as ReportId, ReportTitle, StartDate, FinishDate,
	t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
	sbj.Id as SubjectId, sbj.Subject,g.gradeId, g.grade, sbj.MaximumMark
	FROM Report r 
	LEFT OUTER JOIN Test t ON r.Id = t.ReportId
	LEFT OUTER JOIN Subject sbj ON t.SubjectId = sbj.Id
	LEFT OUTER JOIN Grade g ON sbj.gradeId = g.gradeId
	WHERE @classId IS NULL OR @classId IN (SELECT DISTINCT classId FROM Student s JOIN TestMark tm ON s.id = tm.StudentId WHERE tm.TestId = t.Id)
END

--CREATE PROCEDURE [dbo].[ReportGetAll]
--	@classId int null
--AS
--BEGIN
--	SELECT 
--	r.Id as ReportId, ReportTitle, StartDate, FinishDate,
--	t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
--	sbj.Id as SubjectId, sbj.Subject, sbj.Grade, sbj.MaximumMark
--	FROM Report r
--	LEFT JOIN Test t ON r.Id = t.ReportId
--	JOIN TestMark ts ON t.Id = ts.Id
--	JOIN Subject sbj ON t.SubjectId = sbj.Id
--	JOIN Student s ON ts.StudentId = s.id
--	WHERE s.classId = @classId OR @classId is null