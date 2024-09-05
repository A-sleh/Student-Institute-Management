CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT id as SubjectId, Subject, MaximumMark, Grade
	FROM subject
	WHERE Id = @Id;
END
