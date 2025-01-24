CREATE PROCEDURE [dbo].[StudentGet]
@Id int
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, COUNT(*) as MissedDays, billRequired, 
	s.classId as ClassId, c.title, c.capacity, c.gender, g.gradeId, g.grade
	FROM Student s 
	LEFT OUTER JOIN Class c on s.classId = c.id
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	LEFT OUTER JOIN absence a ON s.id = a.studentId
	WHERE s.id = @Id
	GROUP BY s.id, s.name, s.lastName, s.fatherName, s.birthdate, s.phone ,s.billRequired,
	s.classId, c.title, c.capacity, c.gender, g.grade, g.gradeId
end