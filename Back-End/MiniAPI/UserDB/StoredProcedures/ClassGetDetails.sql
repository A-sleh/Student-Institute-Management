
CREATE PROCEDURE [dbo].[ClassGetDetails]
	@Id int
AS
BEGIN
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, c.grade,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
	FROM class c LEFT OUTER JOIN student s ON c.id = s.classId
	WHERE c.id = @Id;
END