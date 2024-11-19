
CREATE PROCEDURE [dbo].[ClassGetDetails]
	@Id int
AS
BEGIN
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, g.gradeId , g.grade,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
	FROM Class c 
	LEFT OUTER JOIN Student s ON c.id = s.classId
	LEFT OUTER JOIN Grade g ON c.gender = g.gradeId
	WHERE c.id = @Id;
END