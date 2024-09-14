CREATE PROCEDURE [dbo].[ClassGetById]
	@ClassId int
AS
	SELECT *
	FROM Class
	WHERE Id = @ClassId;
RETURN 0