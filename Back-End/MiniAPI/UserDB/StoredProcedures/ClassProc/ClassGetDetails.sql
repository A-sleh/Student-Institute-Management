
CREATE PROCEDURE [dbo].[ClassGetDetails]
	@Id int
AS
BEGIN
	WITH studentAbsences AS ((SELECT studentId, COUNT(*) as MissedDays FROM absence GROUP BY studentId))
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, g.gradeId , g.grade,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.billRequired, COALESCE(a.MissedDays, 0) as MissedDays
	FROM Class c 
	LEFT OUTER JOIN Student s ON c.id = s.classId
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	LEFT OUTER JOIN studentAbsences a ON s.id = a.studentId
	WHERE c.id = @Id
END