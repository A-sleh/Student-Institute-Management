CREATE PROCEDURE [dbo].[TestCheckExistence]
	@classId int,
	@testId int
AS
	if exists (SELECT classId
		FROM Student s 
		LEFT OUTER JOIN TestMark ts ON s.id = ts.StudentId
		WHERE ts.TestId = @testId 
		AND s.classId = @classId)
		SELECT 1;
	ELSE
		SELECT 0;
RETURN 0
