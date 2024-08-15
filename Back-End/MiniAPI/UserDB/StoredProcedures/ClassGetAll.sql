CREATE PROCEDURE [dbo].[ClassGetAll]
AS
BEGIN
	SELECT * 
	FROM class c join student s ON c.id = s.classId;
END