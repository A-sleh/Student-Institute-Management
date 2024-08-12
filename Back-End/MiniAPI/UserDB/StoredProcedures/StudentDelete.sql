CREATE PROCEDURE [dbo].[StudentDelete]
	@Id int
AS
	delete from student
	where id = @Id
RETURN 0
