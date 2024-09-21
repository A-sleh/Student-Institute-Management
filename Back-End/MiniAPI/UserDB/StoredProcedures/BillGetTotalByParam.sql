CREATE PROCEDURE [dbo].[BillGetTotalByParam]
	@Type varchar(5)
AS
IF(@Type = 'in')
	SELECT SUM(Amount) as Income
	FROM Bill
	WHERE Type = 'in';
ELSE
	SELECT SUM(Amount) as Outcome
	FROM Bill
	WHERE Type = 'out';
RETURN 0;
