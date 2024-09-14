CREATE PROCEDURE [dbo].[ClassGetSubjects]
	@ClassId int
AS
	SELECT s.Subject, s.Grade, t.Name + ' ' + t.LastName as 'Teacher'
	FROM Class c 
	INNER JOIN SubTeachClass stc on c.id = stc.ClassId
	INNER JOIN TeacherSubject ts on stc.TeachSubId = ts.Id
	INNER JOIN Teacher t on ts.TeacherId = t.Id
	INNER JOIN Subject s on ts.SubjectId = s.Id
	WHERE c.id = @ClassId;
RETURN 0