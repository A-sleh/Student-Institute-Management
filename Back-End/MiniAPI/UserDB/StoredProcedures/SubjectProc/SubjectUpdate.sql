CREATE PROCEDURE [dbo].[SubjectUpdate]
	@SubjectId INT,
	@Subject VARCHAR(100),
	@MaximumMark INT,
	@Grade varchar(20)
AS
BEGIN
	UPDATE Subject
	SET Subject = @Subject,
		MaximumMark = @MaximumMark,
		Grade = @Grade
	WHERE Id = @SubjectId;
END
