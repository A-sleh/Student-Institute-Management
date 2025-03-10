CREATE PROCEDURE [dbo].[ClassGetAll]
	@gradeId int null
AS
BEGIN
	WITH studentAbsences AS ((SELECT studentId, COUNT(*) as MissedDays FROM absence GROUP BY studentId))
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, g.grade, g.gradeId,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, COALESCE(a.MissedDays,0) AS MissedDays, s.billRequired
	FROM Class c 
	LEFT OUTER JOIN Student s ON c.id = s.classId
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	LEFT OUTER JOIN studentAbsences a ON s.id = a.studentId
	WHERE @gradeId is null OR c.gradeId = @gradeId
END