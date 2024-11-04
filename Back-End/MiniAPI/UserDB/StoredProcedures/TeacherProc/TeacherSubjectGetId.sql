CREATE PROCEDURE [dbo].[TeacherSubjectGetId]
	@TeacherId int,
	@SubjectId int
AS
BEGIN
	SELECT ts.Id as TeacherSubjectId
	FROM TeacherSubject ts
	WHERE ts.TeacherId = @TeacherId AND ts.SubjectId = @SubjectId;
END
