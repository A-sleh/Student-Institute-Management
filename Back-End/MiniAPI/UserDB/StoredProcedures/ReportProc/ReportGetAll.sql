CREATE PROCEDURE [dbo].[ReportGetAll]
	@classId int null,
	@gradeId int null,
	@withTests bit = 1
AS
BEGIN
	IF @withTests = 1
	BEGIN
		SELECT * FROM ReportsWithTests
		WHERE (@classId IS NULL OR TestId IN (SELECT DISTINCT tm.TestId FROM Student s JOIN TestMark tm ON s.id = tm.StudentId WHERE s.classId = @classId))
		AND ((@gradeId IS NULL OR @gradeId = gradeId) OR gradeId IS NULL)
	END
	ELSE
	BEGIN
		SELECT ReportId, ReportTitle, StartDate, FinishDate
		FROM ReportsWithTests
		WHERE (@classId IS NULL OR TestId IN (SELECT DISTINCT tm.TestId FROM Student s JOIN TestMark tm ON s.id = tm.StudentId WHERE s.classId = @classId))
		AND ((@gradeId IS NULL OR @gradeId = gradeId) OR gradeId IS NULL)
	END
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