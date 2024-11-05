CREATE PROCEDURE [dbo].[TeacherDelete]
	@TeacherId int
AS
	DELETE FROM Teacher
	WHERE Id = @TeacherId
RETURN 0
