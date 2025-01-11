CREATE PROCEDURE [dbo].[SubjectAdd]
	@SubjectId INT,
	@Subject NVARCHAR(100),
	@MaximumMark INT,
	@GradeId int
AS
	INSERT INTO Subject(Subject, MaximumMark, gradeId)
	VALUES (@Subject, @MaximumMark, @GradeId);
RETURN 0
