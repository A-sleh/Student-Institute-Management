﻿CREATE PROCEDURE [dbo].[SubjectGetAll]
AS
BEGIN
	SELECT id as SubjectId, Subject, MaximumMark 
	FROM Subject
END
