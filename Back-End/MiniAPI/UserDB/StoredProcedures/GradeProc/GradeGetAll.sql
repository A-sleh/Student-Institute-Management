CREATE PROCEDURE [dbo].[GradeGetAll]
	@filter NVARCHAR(256) null
AS
	SELECT *
	FROM Grade
	WHERE grade LIKE (CONCAT('%', @filter, '%'))
RETURN 0
