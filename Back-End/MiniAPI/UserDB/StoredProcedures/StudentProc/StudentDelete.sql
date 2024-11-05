CREATE PROCEDURE [dbo].[StudentDelete]
	@Id int
AS
	DELETE from Student
	where id = @Id
RETURN 0
