CREATE PROCEDURE [dbo].[TestGet]
@ReportId int
AS
BEGIN
	SELECT r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate, 
	t.Id as TestId, t.TestType, t.Date, t.CorrectionDate, 
	s.Id as SubjectId, s.Subject, s.MaximumMark
	FROM Test t 
	RIGHT OUTER JOIN Report r ON t.ReportId = r.Id
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	WHERE t.ReportId = @ReportId;
END