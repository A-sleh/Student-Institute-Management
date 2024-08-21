CREATE PROCEDURE [dbo].[ClassGetAll]
AS
BEGIN
	SELECT * 
	FROM class c LEFT OUTER JOIN student s ON c.id = s.classId;
END