CREATE PROCEDURE [dbo].[TeacherSubjectUpdate]
	@TeacherId int,
	@SubjectId int,
	@Salary int
AS
	UPDATE TeacherSubject SET Salary = @Salary
	WHERE TeacherId = @TeacherId AND SubjectId = @SubjectId;
RETURN 0