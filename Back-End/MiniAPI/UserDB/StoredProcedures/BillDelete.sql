CREATE PROCEDURE [dbo].[BillDelete]
	@BillId int
AS
	DELETE FROM Bill
	WHERE Id = @BillId;
RETURN 0
