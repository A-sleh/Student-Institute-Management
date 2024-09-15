CREATE PROCEDURE [dbo].[TeacherSubjectGetById]
	@TeacherSubjectId int
AS
	SELECT *
	FROM TeacherSubject
	WHERE id = @TeacherSubjectId;
RETURN 0
