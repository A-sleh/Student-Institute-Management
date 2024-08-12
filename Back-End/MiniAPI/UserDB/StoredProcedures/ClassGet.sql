CREATE PROCEDURE [dbo].[ClassGet]
	@Id int
AS
BEGIN
	SELECT * FROM class
	WHERE id = @Id
END
