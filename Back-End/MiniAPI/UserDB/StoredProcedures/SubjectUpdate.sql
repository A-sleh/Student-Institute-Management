CREATE PROCEDURE [dbo].[SubjectUpdate]
	@Id INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
BEGIN
	UPDATE Subject
	SET Subject = @Subject,
		MaximumMark = @MaximumMark
	WHERE Id = @Id;
END
