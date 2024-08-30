CREATE PROCEDURE [dbo].[TeacherSubjectInsert]
	@TeacherId int,
	@SubjectId int,
	@Amount int
AS
	INSERT INTO TeacherSubject(TeacherId,SubjectId,Salary)
	VALUES (@TeacherId, @SubjectId, @Amount);
RETURN 0
