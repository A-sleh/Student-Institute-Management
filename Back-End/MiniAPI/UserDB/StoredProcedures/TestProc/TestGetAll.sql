CREATE PROCEDURE [dbo].[TestGetAll]
AS
	SELECT t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM Test t
	JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id;
RETURN 0;
