CREATE PROCEDURE [dbo].[SubjectAdd]
	@SubjectId INT,
	@Subject VARCHAR(100),
	@MaximumMark INT,
	@Grade varchar(20)
AS
	INSERT INTO Subject(Subject, MaximumMark, Grade)
	VALUES (@Subject, @MaximumMark, @Grade);
RETURN 0
