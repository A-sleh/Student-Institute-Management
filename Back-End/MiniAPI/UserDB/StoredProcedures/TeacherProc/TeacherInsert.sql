CREATE PROCEDURE [dbo].[TeacherInsert]
	@TeacherId int,
	@Name NVARCHAR(30),
	@LastName NVARCHAR(30),
	@Phone VARCHAR(15)
AS
	INSERT INTO Teacher(Name, LastName, Phone)
	VALUES (@Name, @LastName, @Phone);
RETURN 0
