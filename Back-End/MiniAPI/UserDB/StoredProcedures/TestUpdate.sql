CREATE PROCEDURE [dbo].[TestUpdate]
	@TestId int,
	@TestType varchar(10),
	@Date DATE,
	@CorrectionDate DATE,
	@ReportId int,
	@SubjectId int
AS
	UPDATE Test SET 
		TestType = @TestType,
		Date = @Date,
		CorrectionDate = @CorrectionDate,
		ReportId = @ReportId,
		SubjectId = @SubjectId
	WHERE Id = @TestId
RETURN 0
