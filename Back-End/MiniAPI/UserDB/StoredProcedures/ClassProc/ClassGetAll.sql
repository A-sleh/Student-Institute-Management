CREATE PROCEDURE [dbo].[ClassGetAll]
	@gradeId int null
AS
BEGIN
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, g.grade, g.gradeId,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
	FROM Class c 
	LEFT OUTER JOIN Student s ON c.id = s.classId
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	WHERE @gradeId is null OR c.gradeId = @gradeId
END