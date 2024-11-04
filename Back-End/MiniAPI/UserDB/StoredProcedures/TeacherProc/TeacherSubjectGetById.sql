CREATE PROCEDURE [dbo].[TeacherSubjectGetById]
	@TeacherSubjectId int
AS
	SELECT *
	FROM TeacherSubject
	WHERE Id = @TeacherSubjectId;
RETURN 0
