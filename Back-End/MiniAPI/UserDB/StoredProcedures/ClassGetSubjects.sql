CREATE PROCEDURE [dbo].[ClassGetSubjects]
	@ClassId int
AS
	SELECT s.Id, s.Subject, s.MaximumMark, s.Grade, t.Id, t.Name, t.LastName
    FROM Class c
    INNER JOIN SubTeachClass stc ON c.Id = stc.ClassId
    INNER JOIN TeacherSubject ts ON stc.TeacherSubjectId = ts.Id
    INNER JOIN Teacher t ON ts.TeacherId = t.Id
    INNER JOIN Subject s ON ts.SubjectId = s.Id;
RETURN 0
