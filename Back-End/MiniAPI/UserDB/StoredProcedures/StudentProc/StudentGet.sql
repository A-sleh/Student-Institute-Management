CREATE PROCEDURE [dbo].[StudentGet]
@Id int
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, missedDays, billRequired, 
	s.classId as ClassId, c.title, c.capacity, c.gender, g.gradeId, g.grade
	FROM Student s 
	LEFT OUTER JOIN Class c on s.classId = c.id
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	WHERE s.id = @Id;
end