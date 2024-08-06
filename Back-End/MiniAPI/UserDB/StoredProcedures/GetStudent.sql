CREATE PROCEDURE [dbo].[GetStudent]
	@id int = 0
AS
BEGIN
	SELECT * FROM student
	WHERE id = @id
END
