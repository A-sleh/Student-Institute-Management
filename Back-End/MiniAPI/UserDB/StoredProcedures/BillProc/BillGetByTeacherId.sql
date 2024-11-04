CREATE PROCEDURE [dbo].[BillGetByTeacherId]
	@TeacherId int
AS
	SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Note
	FROM Bill b
	WHERE b.TeacherId = @TeacherId
RETURN 0
