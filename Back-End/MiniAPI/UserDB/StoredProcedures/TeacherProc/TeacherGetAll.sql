CREATE PROCEDURE [dbo].[TeacherGetAll]
	@listSize int = 100,
	@page int = 1
AS
BEGIN
	SELECT Id as TeacherId, *
	FROM Teacher
	ORDER BY Id ASC
	OFFSET (@listSize*(@page-1)) ROWS
	FETCH NEXT @listSize ROWS ONLY
END