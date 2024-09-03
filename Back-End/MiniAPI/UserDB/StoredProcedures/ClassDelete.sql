CREATE PROCEDURE [dbo].[ClassDelete]
	@Id int
AS
	DELETE FROM class
	WHERE id = @Id;
RETURN 0
