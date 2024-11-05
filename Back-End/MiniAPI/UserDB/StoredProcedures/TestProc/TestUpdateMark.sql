CREATE PROCEDURE [dbo].[TestUpdateMark]
	@TestMarkId int,
	@Mark int
AS
	if exists (SELECT 1 FROM TestMark WHERE Id = @TestMarkId)
		UPDATE TestMark SET
		Mark = @Mark
		WHERE Id = @TestMarkId;
	ELSE
		THROW 55000, 'Invalid Id', 1;
RETURN 0;
