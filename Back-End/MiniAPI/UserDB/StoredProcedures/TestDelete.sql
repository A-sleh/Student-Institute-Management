CREATE PROCEDURE [dbo].[TestDelete]
	@TestId int
AS
	DELETE FROM Test
	WHERE Id = @TestId;
RETURN 0
