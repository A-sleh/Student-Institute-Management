CREATE TRIGGER [mainGradesValidation]
	ON [dbo].[Grade]
	INSTEAD OF DELETE
	AS
	BEGIN
		SET NOCOUNT ON;
		IF (SELECT gradeId FROM deleted) in (1, 2)
		BEGIN
			RAISERROR ('cannot remove main grades', 16, 1)
			ROLLBACK TRANSACTION
			RETURN;
		END
		ELSE
			DELETE FROM Grade WHERE gradeId = (select gradeId from deleted)
	END
