CREATE PROCEDURE [dbo].[userLogout]
AS
	IF (SELECT value FROM settings WHERE attribute = 'status') = 'logged out'
		RAISERROR('Already logged out', 16, 1);
	ELSE
		UPDATE settings SET value = 'logged out' WHERE attribute = 'status';
RETURN 0
