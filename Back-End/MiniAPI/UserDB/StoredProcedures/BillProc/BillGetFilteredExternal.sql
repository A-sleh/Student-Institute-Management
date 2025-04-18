CREATE PROCEDURE [dbo].[BillGetFilteredExternal]
	@note NVARCHAR(1024),
	@date DATE NULL,
	@type NVARCHAR(3) NULL,
	@billNo NVARCHAR(512)
AS
	SELECT b.Id as BillId, b.BillNo, b.Amount, b.Type, b.Date,b.Note
	FROM Bill b
	WHERE 
	b.StudentId IS NULL 
	AND b.TeacherId IS NULL
	AND (@type IS NULL OR b.Type = @type)
	AND b.BillNo LIKE(CONCAT(N'%', @billNo, N'%'))
	AND (@date IS NULL OR b.Date >= @date)
	AND b.Note LIKE(CONCAT(N'%', @note, N'%'))
RETURN 0
