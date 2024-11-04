CREATE PROCEDURE [dbo].[BillGetByDate]
	@Date varchar(30)
AS
BEGIN
	SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note,
	s.id as StudentId, s.name, s.lastName,
	t.Id as TeacherId, t.Name, t.LastName
	FROM Bill b
	LEFT OUTER JOIN Student s ON b.StudentId = s.id
	LEFT OUTER JOIN Teacher t ON b.TeacherId = t.Id
	WHERE b.Date Like @Date;
END