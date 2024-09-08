CREATE PROCEDURE [dbo].[StudentGetAll]
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, missedDays, billRequired, c.id as ClassId, c.title
	FROM Student s left join Class c on s.classId = c.id;
end