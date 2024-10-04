CREATE PROCEDURE [dbo].[ClassGetAll]
	@Limit int null
AS
BEGIN
	IF(@Limit is null)
		SELECT c.id as ClassId, c.title, c.capacity, c.gender, c.grade,
		s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
		FROM Class c LEFT OUTER JOIN Student s ON c.id = s.classId;
	ELSE
		SELECT TOP (@Limit)
		c.id as ClassId, c.title, c.capacity, c.gender, c.grade,
		s.id as StudentId, s.name, s.lastName, s.fatherName, s.birthdate, s.phone, s.missedDays, s.billRequired
		FROM Class c LEFT OUTER JOIN Student s ON c.id = s.classId;
END