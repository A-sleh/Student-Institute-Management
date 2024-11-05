CREATE PROCEDURE [dbo].[SubjectGetAll]
AS
BEGIN
	SELECT Id as SubjectId, Subject, MaximumMark, Grade
	FROM Subject
END
