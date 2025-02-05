CREATE PROCEDURE [dbo].[UpdatePassword]
	@oldPass NVARCHAR(1024),
	@newPass NVARCHAR(1024)
AS
	IF (SELECT value FROM settings WHERE attribute = 'status') <> 'logged in'
	BEGIN
		RAISERROR('Must login first before updating password', 16, 1)
		return 1;
	END

	IF (SELECT value FROM settings WHERE attribute = 'password') <> @oldPass
	BEGIN
		UPDATE settings SET value = 'logged out' WHERE attribute = 'status'
		RAISERROR('password incorrect, logged out for safety, relogin and try again', 16, 1)
		return 1;
	END

	UPDATE settings SET value = @newPass WHERE attribute = 'password';
RETURN 0
