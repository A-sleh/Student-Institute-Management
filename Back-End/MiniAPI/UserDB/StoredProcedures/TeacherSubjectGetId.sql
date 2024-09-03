CREATE PROCEDURE [dbo].[TeacherSubjectGetId]
	@TeacherId int,
	@SubjectId int
AS
BEGIN
	SELECT ts.id as TeacherSubjectId
	FROM TeacherSubject ts
	WHERE ts.TeacherId = @TeacherId AND ts.SubjectId = @SubjectId;
END
