CREATE PROCEDURE [dbo].[BillGetTeacherPays]
	@TeacherId int
AS
	SELECT SUM(Amount)
	FROM Bill
	WHERE TeacherId = @TeacherId AND Type = 'out';
RETURN 0
