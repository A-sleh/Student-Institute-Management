CREATE PROCEDURE [dbo].[TeacherUpdate]
	@TeacherId int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@Phone VARCHAR(15)
AS
	UPDATE Teacher SET
	Name = @Name,
	LastName = @LastName,
	Phone = @Phone
	WHERE Id = @TeacherId
RETURN 0
