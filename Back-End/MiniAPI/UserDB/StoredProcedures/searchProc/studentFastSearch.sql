-- search students by name, lastName and class Title

CREATE PROCEDURE [dbo].[studentFastSearch]
	@content NVARCHAR(512) = '',
	@classId int = null,
	@pageSize int = 5,
	@Page INT = 1
AS
	WITH studentAbsences AS ((SELECT studentId, COUNT(*) as MissedDays FROM absence GROUP BY studentId))
	SELECT s.id as StudentId, name, lastName, fatherName, phone, billRequired, COALESCE(a.MissedDays, 0) as MissedDays,
	c.id as ClassId, c.title, c.gradeId, g.grade, c.gender, c.capacity
	FROM Student s left join Class c on s.classId = c.id 
	LEFT JOIN Grade g ON c.gradeId = g.gradeId
	LEFT JOIN studentAbsences a ON s.id = a.studentId
	WHERE (@classId IS NULL OR s.classId = @classId)
	AND ( name LIKE (CONCAT(N'%', @content, N'%'))
	OR lastName LIKE (CONCAT(N'%', @content, N'%')))
	ORDER BY name
	OFFSET ((@Page-1)*@pageSize) ROWS
	FETCH NEXT @PageSize ROWS ONLY
RETURN 0
