CREATE PROCEDURE [dbo].[BillGetByStudentId]
	@StudentId int
AS
	SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note
	FROM Bill b
	WHERE b.StudentId = @StudentId
RETURN 0
