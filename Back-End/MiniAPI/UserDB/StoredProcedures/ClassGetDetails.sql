
CREATE PROCEDURE [dbo].[ClassGetDetails]
	@Id int
AS
BEGIN
	SELECT *
	FROM class c LEFT OUTER JOIN student s ON c.id = s.classId
	WHERE c.id = @Id;
END