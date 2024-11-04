CREATE PROCEDURE [dbo].[ClassGetById]
	@ClassId int
AS
	SELECT *
	FROM Class
	WHERE id = @ClassId;
RETURN 0