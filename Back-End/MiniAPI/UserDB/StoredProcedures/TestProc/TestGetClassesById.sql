CREATE PROCEDURE [dbo].[TestGetClassesById]
	@TestId int
AS
	SELECT (SELECT COUNT(s.id) FROM Student s WHERE s.classId = c.id) as StudentsNumber,
	c.id as ClassId, c.title, c.capacity, c.gender, g.gradeId, g.grade
	FROM Class c
	LEFT OUTER JOIN Grade g ON c.gradeId = g.gradeId
	WHERE c.id in 
	( 
	SELECT s.classId 
	FROM Student s 
	LEFT OUTER JOIN TestMark ts ON s.id = ts.StudentId 
	WHERE ts.TestId = @TestId 
	);
RETURN 0;
