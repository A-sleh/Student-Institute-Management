﻿CREATE PROCEDURE [dbo].[TestGetByReport]
@ReportId int
AS
BEGIN
	SELECT r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate, 
	t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate, 
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark
	FROM Test t 
	RIGHT OUTER JOIN Report r ON t.ReportId = r.Id
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	WHERE t.ReportId = @ReportId;
END