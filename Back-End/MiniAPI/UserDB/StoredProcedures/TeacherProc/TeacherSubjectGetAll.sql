CREATE PROCEDURE [dbo].[TeacherSubjectGetAll]
	@grade varchar(15) null
AS
	SELECT 
	ts.Id as TeacherSubjectId, ts.Salary,
	t.Id as TeacherId, t.Name, t.LastName, t.Phone,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark
	FROM TeacherSubject ts
	JOIN Teacher t ON ts.TeacherId = t.Id
	JOIN Subject s ON ts.SubjectId = s.Id
	WHERE s.Grade = @grade OR @grade IS NULL
RETURN 0
