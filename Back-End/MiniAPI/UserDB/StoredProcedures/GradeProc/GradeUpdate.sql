﻿CREATE PROCEDURE [dbo].[GradeUpdate]
	@gradeId int,
	@grade varchar(256)
AS
	UPDATE Grade SET grade = @grade WHERE gradeId = @gradeId
RETURN 0
