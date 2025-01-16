CREATE PROCEDURE [dbo].[userLogin]
	@username varchar(256),
	@password NVARCHAR(1024)
AS
	
	IF(@username <> (SELECT value FROM settings WHERE attribute = 'username')
	OR (@password <> (SELECT value FROM settings WHERE attribute = 'password')))
	BEGIN
		RAISERROR(@password, 16, 1);
		return 1;
	END
	UPDATE settings SET value = 'logged in' WHERE attribute = 'status';
RETURN 0