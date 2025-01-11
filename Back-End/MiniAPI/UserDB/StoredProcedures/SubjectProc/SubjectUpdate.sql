CREATE PROCEDURE [dbo].[SubjectUpdate]
	@SubjectId INT,
	@Subject NVARCHAR(100),
	@MaximumMark INT,
	@GradeId int
AS
BEGIN
	UPDATE Subject
	SET Subject = @Subject,
		MaximumMark = @MaximumMark,
		gradeId = @GradeId
	WHERE Id = @SubjectId;
END
