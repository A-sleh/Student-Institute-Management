CREATE PROCEDURE [dbo].[TeacherSubjectUpdate]
	@TeacherSubjectId int,
	@SubjectId int,
	@Salary int
AS
	UPDATE TeacherSubject SET SubjectId = @SubjectId, Salary = @Salary
	WHERE id = @TeacherSubjectId;
RETURN 0
