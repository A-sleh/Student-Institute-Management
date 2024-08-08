CREATE PROCEDURE [dbo].[DeleteStudent]
	@Id int
AS
	delete from student
	where id = @Id
RETURN 0
