CREATE PROCEDURE [dbo].[SubjectUpdate]
	@SubjectId INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
BEGIN
	UPDATE Subject
	SET Subject = @Subject,
		MaximumMark = @MaximumMark
	WHERE Id = @SubjectId;
END
