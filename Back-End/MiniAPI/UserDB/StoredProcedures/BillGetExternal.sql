CREATE PROCEDURE [dbo].[BillGetExternal]
	@Type varchar(5)
AS
	SELECT b.Id as BillId, b.BillNo, b.Type, b.Amount, b.Date, b.Amount, b.Note
	FROM Bill b
	WHERE Type = @Type AND (TeacherId is null AND StudentId is null);
RETURN 0
