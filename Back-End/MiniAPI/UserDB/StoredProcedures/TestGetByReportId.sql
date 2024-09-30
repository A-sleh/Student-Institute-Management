CREATE PROCEDURE [dbo].[Procedure1]
	@ReportId int
AS
	SELECT t.Id as TestId, t.Date, t.CorrectionDate, t.TestType,
	s.Id as SubjectId, s.MaximumMark, s.Subject, s.Grade
	FROM Test t
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id;
RETURN 0
