CREATE PROCEDURE [dbo].[TeacherInsert]
	@TeacherId int,
	@Name varchar(30),
	@LastName varchar(30),
	@Phone varchar(15)
AS
	INSERT INTO Teacher(Name, LastName, Phone)
	VALUES (@Name, @LastName, @Phone);
RETURN 0
