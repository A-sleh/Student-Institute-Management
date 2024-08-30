CREATE PROCEDURE [dbo].[TeacherGetAll]
AS
BEGIN
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone, s.Id as SubjectId, s.Subject, s.MaximumMark
	FROM teacher t
	LEFT OUTER JOIN TeacherSubject ts ON t.id = ts.TeacherId
	LEFT OUTER JOIN Subject s ON ts.SubjectId = s.Id
END
