CREATE PROCEDURE [dbo].[LoadSettings]
AS
	SELECT * FROM settings WHERE attribute NOT IN ('password');
RETURN 0
