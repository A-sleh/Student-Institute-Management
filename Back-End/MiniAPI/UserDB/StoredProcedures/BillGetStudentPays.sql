CREATE PROCEDURE [dbo].[BillGetStudentPays]
	@StudentId int
AS
	SELECT SUM(Amount) as Paid
	FROM Bill b
	WHERE b.StudentId = @StudentId AND Type = 'in';
RETURN 0
