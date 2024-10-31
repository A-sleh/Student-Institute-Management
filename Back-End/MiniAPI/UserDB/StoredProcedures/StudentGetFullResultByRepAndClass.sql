﻿CREATE PROCEDURE [dbo].[StudentGetFullResultByRepAndClass]
	@reportId int,
	@classId int
AS
	SELECT
	st.id as StudentId, st.name, st.lastName, st.fatherName,
	t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark,
	tm.Id as TestMarkId, tm.Mark
	FROM Student st 
	LEFT OUTER JOIN TestMark tm ON st.id = tm.StudentId
	JOIN Test t ON tm.TestId = t.Id
	JOIN Subject s ON t.SubjectId = s.Id
	WHERE t.ReportId = @reportId AND st.classId = @classId
RETURN 0
