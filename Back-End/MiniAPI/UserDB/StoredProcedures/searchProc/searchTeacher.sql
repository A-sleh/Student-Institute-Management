CREATE PROCEDURE [dbo].[searchTeacher]
	@content NVARCHAR(512) = ''
AS
	WITH TSubjectsNO AS (
	SELECT t.Id as TeacherId, COUNT(*) AS SubjectNO 
	FROM Teacher t JOIN TeacherSubject ts ON t.Id = ts.TeacherId 
	GROUP BY t.Id
	), 
	TClassesNO AS (
	SELECT DISTINCT ts.TeacherId, COUNT(*) AS ClassNO 
	FROM TeacherSubject ts 
	JOIN SubTeachClass stc ON ts.Id = stc.TeachSubId 
	GROUP BY ts.TeacherId, ts.Id
	)
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone, COALESCE(subno.SubjectNO, 0) AS SubNO, COALESCE(classno.ClassNO, 0) AS ClassNO
	FROM Teacher t
	LEFT JOIN TSubjectsNO subno ON t.Id = subno.TeacherId
	LEFT JOIN TClassesNO classno ON t.Id = classno.TeacherId
	WHERE (CONCAT(t.Name,N' ', t.LastName) LIKE (CONCAT('%', @content, '%')))
RETURN 0
