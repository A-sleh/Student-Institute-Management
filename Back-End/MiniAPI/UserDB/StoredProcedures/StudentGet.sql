CREATE PROCEDURE [dbo].[StudentGet]
	@Id int
AS
BEGIN
	SELECT * FROM student
	WHERE id = @Id
END
