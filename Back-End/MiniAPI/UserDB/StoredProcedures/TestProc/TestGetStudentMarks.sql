CREATE PROCEDURE [dbo].[TestGetStudentMarks]
	@StudentId int,
	@ReportId int null
AS
	SELECT tm.Id as TestMarkId, tm.Mark,
	t.Id as TestId, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM TestMark tm
	LEFT OUTER JOIN Test t ON tm.TestId = t.Id
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	WHERE tm.StudentId = @StudentId AND (t.ReportId = @ReportId OR @ReportId is null);
RETURN 0;
