CREATE PROCEDURE [dbo].[TestGetClassMarks]
	@TestId int,
	@ClassId int
AS
	SELECT tm.Id as TestMarkId, tm.Mark,
	s.id as StudentId, s.name, s.lastName, s.fatherName
	FROM TestMark tm
	LEFT OUTER JOIN Student s ON tm.StudentId = s.id
	WHERE s.classId = @ClassId AND tm.TestId = @TestId;
RETURN 0;
