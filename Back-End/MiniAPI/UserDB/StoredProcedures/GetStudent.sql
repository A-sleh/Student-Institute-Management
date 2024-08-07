CREATE PROCEDURE [dbo].[GetStudent]
	@Id int
AS
BEGIN
	SELECT * FROM student
	WHERE id = @Id
END
