CREATE TRIGGER [ReportCheckTestGrade]
	ON [dbo].[Test]
	INSTEAD OF INSERT
	AS
	BEGIN
		SET NOCOUNT ON
		IF  (SELECT ReportId FROM inserted ) is null OR (SELECT gradeId FROM inserted i JOIN Subject s ON i.SubjectId = s.Id) = 
		(SELECT gradeId FROM Test t JOIN Subject s ON t.SubjectId = s.Id WHERE ReportId = (SELECT ReportId FROM inserted))
		BEGIN
			INSERT INTO Test(CorrectionDate, Date, ReportId, SubjectId, TestType, Title) (SELECT CorrectionDate, Date, ReportId, SubjectId, TestType, Title FROM inserted);
		END
		ELSE
		THROW 55000, 'grade is not matched', 1;
	END
