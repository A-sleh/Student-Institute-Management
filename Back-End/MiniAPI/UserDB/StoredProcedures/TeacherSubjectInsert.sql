CREATE PROCEDURE [dbo].[TeacherSubjectInsert]
	@TeacherId int,
	@SubjectId int,
	@Salary int
AS
	INSERT INTO TeacherSubject(TeacherId,SubjectId,Salary)
	VALUES (@TeacherId, @SubjectId, @Salary);
RETURN 0
