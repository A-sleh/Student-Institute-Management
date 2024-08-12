CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT * FROM Subject
	WHERE Id = @Id;
END
