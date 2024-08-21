CREATE PROCEDURE [dbo].[StudentGet]
@Id int
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, missedDays, billRequired, s.classId as ClassId, c.title, c.capacity, c.gender, c.grade
	FROM student s left outer join class c on s.classId = c.id
	WHERE s.id = @Id;
end