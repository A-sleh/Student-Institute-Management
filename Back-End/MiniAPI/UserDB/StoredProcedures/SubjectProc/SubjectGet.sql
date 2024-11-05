CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT Id as SubjectId, Subject, MaximumMark, Grade
	FROM Subject
	WHERE Id = @Id;
END
