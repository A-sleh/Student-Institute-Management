CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT id as SubjectId, Subject, MaximumMark 
	FROM Subject
	WHERE Id = @Id;
END
