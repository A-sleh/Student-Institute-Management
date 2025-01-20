CREATE TRIGGER [ReportCheckTestGradeUpdate]
	ON [dbo].[Test]
	FOR UPDATE
	AS
	BEGIN
		SET NOCOUNT ON; 
		IF UPDATE(ReportId)
		BEGIN
			IF 
			(
				(
				SELECT COUNT(*) FROM 
					(
						SELECT DISTINCT gradeId
						FROM Test t JOIN Subject s ON t.SubjectId = s.Id
						WHERE t.ReportId in (SELECT i.ReportId FROM inserted i)
						GROUP BY s.gradeId
					) as t1
				) > 1
			)
			BEGIN
				RAISERROR ('grade is not matched', 16, 1)
				ROLLBACK TRANSACTION
				RETURN;
			END
		END
	END