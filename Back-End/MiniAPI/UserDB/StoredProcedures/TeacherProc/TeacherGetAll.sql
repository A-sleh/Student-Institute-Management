CREATE PROCEDURE [dbo].[TeacherGetAll]
	@listSize int null,
	@page int = 1
AS
BEGIN
	SELECT TOP(@listSize)
	* FROM
	(SELECT TOP(@listSize*@page)
	t.Id as TeacherId, t.Name, t.LastName, t.Phone
	from Teacher t
	ORDER BY Id desc) as pagination
END