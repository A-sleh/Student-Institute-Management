CREATE PROCEDURE [dbo].[TeacherGetById]
	@TeacherId int
AS
BEGIN
	SELECT 
	ts.Id as TeacherSubjectId, ts.TeacherId, ts.Salary, 
	s.Id as SubjectId, s.Subject, s.MaximumMark
	FROM TeacherSubject ts 
	INNER JOIN Subject s ON ts.SubjectId = s.Id
	WHERE ts.TeacherId = @TeacherId;
END