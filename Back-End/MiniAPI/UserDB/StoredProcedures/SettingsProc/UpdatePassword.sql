CREATE PROCEDURE [dbo].[UpdatePassword]
	@oldPass varchar(1024),
	@newPass varchar(1024)
AS
	IF (SELECT value FROM settings WHERE attribute = 'password') = @oldPass
	BEGIN
		UPDATE settings SET value = @newPass WHERE attribute = 'password';
	END
	ELSE
	BEGIN
		UPDATE settings SET value = 'logged out' WHERE attribute = 'status'
		RAISERROR('password incorrect, logged out for safety, relogin and try again', 16, 1)
		return 1;
	END
RETURN 0
