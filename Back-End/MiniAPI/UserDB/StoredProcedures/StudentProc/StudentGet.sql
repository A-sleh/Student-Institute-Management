CREATE PROCEDURE [dbo].[StudentGet]
@Id int
AS
begin
	WITH studentAbsences AS ((SELECT studentId, COUNT(*) as MissedDays FROM absence GROUP BY studentId))
	SELECT s.id as StudentId, name, lastName, fatherName, phone, COALESCE(a.MissedDays, 0) as MissedDays, billRequired, 
	s.classId as ClassId, c.title, c.capacity, c.gender, g.gradeId, g.grade
	FROM Student s 
	LEFT OUTER JOIN Class c on s.classId = c.id
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	LEFT OUTER JOIN studentAbsences a ON s.id = a.studentId
	WHERE s.id = @Id
end