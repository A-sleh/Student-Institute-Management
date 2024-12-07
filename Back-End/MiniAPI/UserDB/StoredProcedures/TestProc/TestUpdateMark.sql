CREATE PROCEDURE [dbo].[TestUpdateMark]
	@TestMarkId int,
	@Mark int
AS
	UPDATE TestMark SET
	Mark = @Mark
	WHERE Id = @TestMarkId;
RETURN 0;
