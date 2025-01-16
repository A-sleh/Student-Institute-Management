CREATE PROCEDURE [dbo].[UpdateSettings]
	@attribute NVARCHAR(256),
	@value NVARCHAR(1024)
AS
	IF @attribute = 'language' OR @attribute = 'fullscreen'
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
