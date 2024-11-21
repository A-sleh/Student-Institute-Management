CREATE PROCEDURE [dbo].[GradeDelete]
	@gradeId int
AS
	DELETE FROM Grade WHERE gradeId = @gradeId;
RETURN 0
