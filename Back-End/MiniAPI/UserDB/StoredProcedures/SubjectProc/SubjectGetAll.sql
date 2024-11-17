﻿CREATE PROCEDURE [dbo].[SubjectGetAll]
AS
BEGIN
	SELECT Id as SubjectId, Subject, MaximumMark, g.gradeId, grade
	FROM Subject s
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
END
