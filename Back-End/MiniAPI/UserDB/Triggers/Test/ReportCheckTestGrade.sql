CREATE TRIGGER [ReportCheckTestGrade]
	ON [dbo].[Test]
	INSTEAD OF INSERT
	AS
	BEGIN
		SET NOCOUNT ON
		IF (SELECT COUNT(*) FROM (SELECT DISTINCT gradeId FROM inserted i JOIN Subject s ON i.SubjectId = s.Id) as t1) > 1
		BEGIN
			RAISERROR('you can only insert into 1 report and only 1 grade specified', 16, 1)
			return;
		END
		IF (
			(	SELECT DISTINCT s.gradeId FROM Test t 
				JOIN Subject s ON t.SubjectId = s.Id
				WHERE t.ReportId = (SELECT DISTINCT ReportId FROM inserted)
			) 
			=
			(
				SELECT DISTINCT gradeId FROM inserted i JOIN Subject s ON i.SubjectId = s.Id
			)
		)
		OR not exists (	SELECT DISTINCT s.gradeId FROM Test t 
				JOIN Subject s ON t.SubjectId = s.Id
				WHERE t.ReportId = (SELECT DISTINCT ReportId FROM inserted)
			)
		BEGIN
			INSERT INTO Test(CorrectionDate, Date, ReportId, SubjectId, TestType, Title) (SELECT CorrectionDate, Date, ReportId, SubjectId, TestType, Title FROM inserted);
		END
		ELSE
		THROW 55000, 'grade is not matched', 1;
	END
