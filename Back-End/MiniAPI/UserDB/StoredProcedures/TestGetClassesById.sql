CREATE PROCEDURE [dbo].[TestGetClassesById]
	@TestId int
AS
	SELECT  c.id as ClassId, c.title, c.capacity, c.gender, c.grade
	FROM Class c
	WHERE c.id in 
	( 
	SELECT s.classId 
	FROM Student s 
	LEFT OUTER JOIN TestMark ts ON s.id = ts.StudentId 
	WHERE ts.TestId = @TestId 
	);
RETURN 0;
