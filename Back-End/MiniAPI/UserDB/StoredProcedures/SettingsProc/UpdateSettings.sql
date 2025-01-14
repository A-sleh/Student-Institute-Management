CREATE PROCEDURE [dbo].[UpdateSettings]
	@attribute varchar(256),
	@value varchar(1024)
AS
	IF @attribute = 'language'
	BEGIN
		UPDATE settings SET value = @value WHERE attribute = @attribute;
	END
	ELSE IF @attribute = 'username'
	BEGIN
		IF (SELECT value FROM settings WHERE attribute = 'status') = 'logged out'
		BEGIN
			RAISERROR('You must login before updating your username', 16, 1)
			return 1;
		END
		UPDATE settings SET value = @value WHERE attribute = @attribute;
	END
	ELSE
	BEGIN 
		RAISERROR('You cannot update this attribute', 16, 1)
		return 1;
	END
RETURN 0;
