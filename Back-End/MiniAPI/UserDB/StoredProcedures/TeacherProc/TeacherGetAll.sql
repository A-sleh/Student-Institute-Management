CREATE PROCEDURE [dbo].[TeacherGetAll]
AS
BEGIN
	SELECT Id as TeacherId, *
	FROM Teacher
	ORDER BY Id ASC
END