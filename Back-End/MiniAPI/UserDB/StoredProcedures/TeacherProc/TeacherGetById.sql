CREATE PROCEDURE [dbo].[TeacherGetById]
	@TeacherId int
AS
BEGIN
	SELECT 
	t.Id as TeacherId,t.Name, t.LastName, t.Phone,
	ts.Id as TeacherSubjectId ,ts.Salary,
	ts.SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark,
	c.id as classId, c.title, c.capacity, c.gender, c.gradeId
	FROM Teacher t 
	LEFT OUTER JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	LEFT OUTER JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId
	LEFT OUTER JOIN Class c ON stc.ClassId = c.id
	LEFT OUTER JOIN Subject s ON ts.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	WHERE t.Id = @TeacherId;
END