CREATE PROCEDURE [dbo].[SubjectAdd]
	@SubjectId INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
	INSERT INTO Subject(Subject, MaximumMark)
	VALUES (@Subject, @MaximumMark);
RETURN 0
