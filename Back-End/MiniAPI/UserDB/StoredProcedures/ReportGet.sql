CREATE PROCEDURE [dbo].[ReportGet]
	@Id int
AS
BEGIN
	SELECT r.Id as ReportId, ReportTitle, StartDate, FinishDate,
	t.Id as TestId, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark
	FROM Report r
	LEFT OUTER JOIN Test t ON r.Id = t.ReportId
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	WHERE r.Id = @Id;
END