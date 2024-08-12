CREATE PROCEDURE [dbo].[SubjectAdd]
	@Id INT,
	@Subject VARCHAR(100),
	@MaximumMark INT
AS
	INSERT INTO Subject(Subject, MaximumMark)
	VALUES (@Subject, @MaximumMark);
RETURN 0
