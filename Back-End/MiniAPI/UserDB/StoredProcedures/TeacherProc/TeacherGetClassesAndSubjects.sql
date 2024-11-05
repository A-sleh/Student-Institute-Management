CREATE PROCEDURE [dbo].[TeacherGetClassesAndSubjects]
	@TeacherId int
AS
	SELECT ts.Id as TeacherSubjectId, ts.Salary,
	s.Id as SubjectId, s.Subject, s.Grade, s.MaximumMark,
	c.id as ClassId, c.title, c.capacity, c.gender, c.grade
	FROM TeacherSubject ts
	LEFT OUTER JOIN Subject s ON ts.SubjectId = s.Id
	LEFT OUTER JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId
	LEFT OUTER JOIN Class c ON stc.ClassId = c.id
	WHERE ts.TeacherId = @TeacherId;
RETURN 0
