CREATE PROCEDURE [dbo].[userLogin]
	@username varchar(256),
	@password NVARCHAR(1024)
AS
	IF(@username <> (SELECT value FROM settings WHERE attribute = 'username') OR (@password <> (SELECT value FROM settings WHERE attribute = 'password')))
	THROW 55000,'UnAuthorized', 1;
	UPDATE settings SET value = 'logged in' WHERE attribute = 'status';
RETURN 0