CREATE PROCEDURE [dbo].[TeacherGetPaginated]
	@limit INT,
	@page INT,
	@total INT OUTPUT
AS
	SET @total = (SELECT COUNT(*) FROM Teacher);
	WITH teachers AS (SELECT Id, Name, LastName, Phone
	FROM Teacher 
	ORDER BY Name
	OFFSET (@page-1)*@limit ROWS
	FETCH NEXT @limit ROWS ONLY)
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone,
	ts.Id as TeacherSubjectId, ts.Salary,
	s.Id as SubjectId, s.Subject, s.MaximumMark, s.gradeId, g.grade,
	c.id as classId, c.title, c.capacity, c.gender, c.gradeId, g.grade
	FROM Teachers t 
	LEFT JOIN TeacherSubject ts ON t.Id = ts.TeacherId
	LEFT JOIN Subject s ON ts.SubjectId = s.Id
	LEFT JOIN Grade g ON s.gradeId = g.gradeId
	LEFT JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId
	LEFT JOIN Class c ON stc.ClassId = c.id
RETURN 0;
