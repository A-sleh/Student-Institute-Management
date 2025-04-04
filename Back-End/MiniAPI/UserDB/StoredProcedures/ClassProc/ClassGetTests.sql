﻿CREATE PROCEDURE [dbo].[ClassGetTests]
	@classId int,
	@showOnlyUncorrected int null
AS
	SELECT DISTINCT 
	t.Id as TestId, t.Title, t.Date, t.CorrectionDate, t.TestType,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark,
	r.Id as ReportId, r.ReportTitle, r.StartDate, r.FinishDate
	FROM Class c
	LEFT OUTER JOIN Student st ON c.id = st.classId
	LEFT OUTER JOIN TestMark ts ON st.id = ts.StudentId
	JOIN Test t ON ts.TestId = t.Id
	JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	LEFT OUTER JOIN Report r ON t.ReportId = r.Id
	WHERE c.id = @classId AND ( (@showOnlyUncorrected = 1 AND ts.Mark is null) OR (@showOnlyUncorrected = 0 or @showOnlyUncorrected is null));
RETURN 0
