﻿CREATE PROCEDURE [dbo].[TestGetAll]
AS
	SELECT t.Id as TestId, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM Test t
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id;
RETURN 0;