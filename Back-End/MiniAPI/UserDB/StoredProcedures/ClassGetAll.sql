CREATE PROCEDURE [dbo].[ClassGetAll]
AS
BEGIN
	SELECT c.id as ClassId, c.title, c.capacity, c.gender, c.grade,
	s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
	FROM Class c LEFT OUTER JOIN student s ON c.id = s.classId;
END