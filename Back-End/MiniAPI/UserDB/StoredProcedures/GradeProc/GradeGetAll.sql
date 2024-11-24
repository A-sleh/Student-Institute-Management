CREATE PROCEDURE [dbo].[GradeGetAll]
	@filter varchar(256) null
AS
	SELECT *
	FROM Grade
	WHERE grade LIKE (CONCAT('%', @filter, '%'))
RETURN 0
