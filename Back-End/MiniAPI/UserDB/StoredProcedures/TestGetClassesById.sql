CREATE PROCEDURE [dbo].[TestGetClassesById]
	@TestId int
AS
	SELECT (SELECT COUNT(s.id) FROM Student s WHERE s.classId = c.id) as StudentsNumber,
	c.id as ClassId, c.title, c.capacity, c.gender, c.grade
	FROM Class c
	WHERE c.id in 
	( 
	SELECT s.classId 
	FROM Student s 
	LEFT OUTER JOIN TestMark ts ON s.id = ts.StudentId 
	WHERE ts.TestId = @TestId 
	);
RETURN 0;
