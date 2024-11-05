CREATE PROCEDURE [dbo].[TestSetMarks]
	@TestMark int,
	@Mark int
AS
	UPDATE TestMark SET Mark = @Mark
	WHERE Id = @TestMark;
RETURN 0
