CREATE TRIGGER [settingsUnDeleteAble]
	ON [dbo].[settings]
	INSTEAD OF DELETE
	AS
	BEGIN
		RAISERROR ('delete statment has been terminated by system: delete unavailable from this table', 55000, 1);
	END
