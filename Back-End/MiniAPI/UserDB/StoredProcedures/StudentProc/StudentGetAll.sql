CREATE PROCEDURE [dbo].[StudentGetAll]
	@classId int null
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, billRequired, Count(*) as MissedDays,
	c.id as ClassId, c.title, c.gradeId, g.grade, c.gender
	FROM Student s left join Class c on s.classId = c.id 
	LEFT JOIN Grade g ON c.gradeId = g.gradeId
	LEFT JOIN absence a ON s.id = a.studentId
	WHERE @classId IS NULL OR s.classId = @classId
	GROUP BY s.id, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.billRequired,
	c.id, c.title, c.gradeId, g.grade, c.gender
	ORDER BY s.name
end