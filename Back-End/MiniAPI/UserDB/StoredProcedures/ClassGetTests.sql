﻿CREATE PROCEDURE [dbo].[ClassGetTests]
	@classId int
AS
	SELECT t.Id as TestId, t.Date, t.CorrectionDate, t.TestType,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM Class c
	JOIN Student st ON c.id = st.classId
	JOIN TestMark ts ON st.id = ts.StudentId
	JOIN Test t ON ts.TestId = t.Id
	JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	WHERE c.id = @classId;
RETURN 0
