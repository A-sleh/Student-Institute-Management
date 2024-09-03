CREATE PROCEDURE [dbo].[TeacherUpdate]
	@TeacherId int,
	@Name varchar(30),
	@LastName varchar(30),
	@Phone varchar(15)
AS
	UPDATE Teacher SET
	Name = @Name,
	LastName = @LastName,
	phone = @Phone
	WHERE Id = @TeacherId
RETURN 0
