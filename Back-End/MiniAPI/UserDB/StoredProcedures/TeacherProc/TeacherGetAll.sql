CREATE PROCEDURE [dbo].[TeacherGetAll]
AS
BEGIN
	SELECT t.Id as TeacherId, t.Name, t.LastName, t.Phone
	from Teacher t;
END