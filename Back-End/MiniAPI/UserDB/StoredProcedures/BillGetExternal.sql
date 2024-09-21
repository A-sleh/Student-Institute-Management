CREATE PROCEDURE [dbo].[BillGetExternal]
	@Type varchar(5)
AS
	SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Amount
	FROM Bill b
	WHERE Type = @Type AND (TeacherId = null AND StudentId = null);
RETURN 0
