CREATE PROCEDURE [dbo].[TestGetMarksById]
	@TestId int
AS
	SELECT ts.Id as TestMarkId, ts.Mark,
	s.id as StudentId, s.name, s.lastName, s.fatherName,
	c.id as ClassId, c.title, c.capacity, c.gender, c.grade
	FROM TestMark ts
	LEFT OUTER JOIN Student s ON ts.StudentId = s.id
	LEFT OUTER JOIN Class c ON s.classId = c.id
	WHERE ts.TestId = @TestId
RETURN 0
