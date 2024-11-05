CREATE PROCEDURE [dbo].[TeacherSubjectDelete]
	@TeacherSubjectId int
AS
	DELETE FROM TeacherSubject
	WHERE Id = @TeacherSubjectId;
RETURN 0