CREATE PROCEDURE [dbo].[BillGetTotalByParam]
	@Type varchar(5)
AS
IF(@Type = 'in')
	SELECT SUM(Amount) as Income
	FROM Bill
	WHERE Type = 'in';
ELSE IF(@Type = 'out')
	SELECT SUM(Amount) as Outcome
	FROM Bill
	WHERE Type = 'out';
ELSE
	THROW 55000, 'Invalid Parameter', 0;
RETURN 0;
