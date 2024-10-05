CREATE PROCEDURE [dbo].[ClassGetTeachers]
	@ClassId int
AS
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone
	FROM Teacher t
	LEFT OUTER JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	LEFT OUTER JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId
	WHERE stc.ClassId = @ClassId;
RETURN 0
