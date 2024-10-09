CREATE PROCEDURE [dbo].[TestGetClassesById]
	@TestId int
AS
	SELECT c.id,
	c.id as ClassId, c.title, c.capacity, c.gender, c.grade,
	(SELECT COUNT(s.id) FROM Student s WHERE s.classId = c.Id) as StudentsNumber
	FROM Class c
	WHERE c.id in 
	( 
	SELECT s.classId 
	FROM Student s 
	LEFT OUTER JOIN TestMark ts ON s.id = ts.StudentId 
	WHERE ts.TestId = @TestId 
	);
RETURN 0;
