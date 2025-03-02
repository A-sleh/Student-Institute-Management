CREATE PROCEDURE [dbo].[BillGetTotalByParam]
	@Type varchar(5)
AS
	if(@Type <> 'in' AND @Type <> 'out')
	THROW 55000, 'invalid sp param', 1;
	SELECT * 
	FROM Bill
	WHERE Type = @Type
	-- will not be needed later
RETURN 0;
