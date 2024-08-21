CREATE PROCEDURE [dbo].[StudentGetAll]
AS
begin
	SELECT s.id as StudentId, name, lastName, fatherName, birthdate, phone, missedDays, billRequired, c.id as ClassId, c.title as ClassTitle
	FROM student s left join class c on s.classId = c.id;
end