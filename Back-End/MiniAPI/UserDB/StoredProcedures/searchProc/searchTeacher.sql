CREATE PROCEDURE [dbo].[searchTeacher]
	@content NVARCHAR(512) = ''
AS
	SELECT t.Id as TeacherId, t.Name, t.LastName
	FROM Teacher t
	WHERE (CONCAT(t.Name,N' ', t.LastName) LIKE (CONCAT('%', @content, '%')))
RETURN 0
