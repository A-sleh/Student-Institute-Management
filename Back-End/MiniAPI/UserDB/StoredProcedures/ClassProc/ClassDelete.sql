CREATE PROCEDURE [dbo].[ClassDelete]
	@Id int
AS
	DELETE FROM Class
	WHERE id = @Id;
RETURN 0
