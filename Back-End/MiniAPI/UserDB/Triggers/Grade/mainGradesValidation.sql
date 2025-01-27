CREATE TRIGGER [mainGradesValidation]
	ON [dbo].[Grade]
	INSTEAD OF DELETE
	AS
	BEGIN
		SET NOCOUNT ON;
		IF (SELECT gradeId FROM deleted) in (1, 2)
		BEGIN
			RAISERROR ('cannot remove main grades, which Ids is: 1 and 2', 16, 1)
			ROLLBACK TRANSACTION
			RETURN;
		END
		ELSE
			DELETE FROM Grade WHERE gradeId = (select gradeId from deleted)
	END
