CREATE PROCEDURE [dbo].[ClassGetTeachers]
	@ClassId int
AS
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone,
	ts.Id as TeacherSubjectId, ts.Salary,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark
	FROM Teacher t
	LEFT OUTER JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	LEFT OUTER JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId
	LEFT OUTER JOIN Subject s ON ts.SubjectId = s.Id
	WHERE stc.ClassId = @ClassId;
RETURN 0
