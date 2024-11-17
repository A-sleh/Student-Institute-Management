CREATE PROCEDURE [dbo].[TeacherSubjectGetByClass]
	@classId int
AS
	SELECT 
	t.Id as TeacherId, t.Name, t.LastName, t.Phone,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark,
	ts.Id as TeacherSubjectId, ts.Salary
	FROM TeacherSubject ts
	INNER JOIN Subject s ON ts.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	INNER JOIN Teacher t ON ts.TeacherId = t.Id
	INNER JOIN SubTeachClass stc on ts.Id = stc.TeachSubId
	WHERE stc.ClassId = @classId;

RETURN 0