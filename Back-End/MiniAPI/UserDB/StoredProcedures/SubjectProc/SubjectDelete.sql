CREATE PROCEDURE [dbo].[SubjectDelete]
	@Id INT
AS
	DELETE FROM Subject
	WHERE Id = @Id;
RETURN 0
