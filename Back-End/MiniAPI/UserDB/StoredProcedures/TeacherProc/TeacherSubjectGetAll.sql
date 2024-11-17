CREATE PROCEDURE [dbo].[TeacherSubjectGetAll]
	@gradeId int null
AS
	SELECT 
	ts.Id as TeacherSubjectId, ts.Salary,
	t.Id as TeacherId, t.Name, t.LastName, t.Phone,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark
	FROM TeacherSubject ts
	JOIN Teacher t ON ts.TeacherId = t.Id
	JOIN Subject s ON ts.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	WHERE g.gradeId = @gradeId OR @gradeId IS NULL
RETURN 0
