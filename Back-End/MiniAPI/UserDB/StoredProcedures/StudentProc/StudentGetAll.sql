CREATE PROCEDURE [dbo].[StudentGetAll]
	@classId int null
AS
begin
	WITH studentAbsences AS ((SELECT studentId, COUNT(*) as MissedDays FROM absence GROUP BY studentId))
	SELECT s.id as StudentId, name, lastName, fatherName, phone, billRequired, COALESCE(a.MissedDays, 0) as MissedDays,
	c.id as ClassId, c.title, c.gradeId, g.grade, c.gender, c.capacity
	FROM Student s left join Class c on s.classId = c.id 
	LEFT JOIN Grade g ON c.gradeId = g.gradeId
	LEFT JOIN studentAbsences a ON s.id = a.studentId
	WHERE @classId IS NULL OR s.classId = @classId
end