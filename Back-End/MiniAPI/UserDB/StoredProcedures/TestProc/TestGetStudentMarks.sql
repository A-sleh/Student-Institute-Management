CREATE PROCEDURE [dbo].[TestGetStudentMarks]
	@StudentId int,
	@ReportId int null
AS
	SELECT tm.Id as TestMarkId, tm.Mark,
	t.Id as TestId, t.TestType, t.Date, t.CorrectionDate, t.Title,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM TestMark tm
	JOIN Test t ON tm.TestId = t.Id
	JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	WHERE tm.StudentId = @StudentId AND (t.ReportId = @ReportId OR @ReportId is null);
RETURN 0;
