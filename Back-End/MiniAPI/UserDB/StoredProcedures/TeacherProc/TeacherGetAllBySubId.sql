CREATE PROCEDURE [dbo].[TeachersGetAllBySubId]
	@SubjectId int
AS
BEGIN
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone, ts.Id as SubjectId, s.Subject, s.MaximumMark
	FROM Teacher t
	INNER JOIN TeacherSubject ts on t.Id = ts.TeacherId
	INNER JOIN Subject s on ts.SubjectId = s.Id
	WHERE ts.SubjectId = @SubjectId;
END