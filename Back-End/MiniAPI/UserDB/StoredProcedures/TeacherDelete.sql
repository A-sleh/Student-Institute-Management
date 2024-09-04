CREATE PROCEDURE [dbo].[TeacherDelete]
	@TeacherId int
AS
	DELETE FROM teacher
	WHERE Id = @TeacherId
RETURN 0
