CREATE PROCEDURE [dbo].[TeacherGetById]
	@TeacherId int
AS
BEGIN
	SELECT 
	t.Id as TeacherId,t.Name, t.LastName, t.Phone,
	ts.Id as TeacherSubjectId ,ts.Salary,
	ts.SubjectId, s.Subject, s.MaximumMark
	FROM Teacher t 
	LEFT OUTER JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	LEFT OUTER JOIN Subject s ON ts.SubjectId = s.Id
	WHERE t.Id = @TeacherId;
END