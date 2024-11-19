CREATE PROCEDURE [dbo].[TestGetMarksById]
	@TestId int
AS
	SELECT ts.Id as TestMarkId, ts.Mark,
	s.id as StudentId, s.name, s.lastName, s.fatherName,
	c.id as ClassId, c.title, c.capacity, g.gradeId, c.gender, g.grade
	FROM TestMark ts
	JOIN Student s ON ts.StudentId = s.id
	LEFT OUTER JOIN Class c ON s.classId = c.id
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	WHERE ts.TestId = @TestId
RETURN 0
