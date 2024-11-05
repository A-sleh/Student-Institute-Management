CREATE PROCEDURE [dbo].[TestAdd]
	@TestType VARCHAR(20),
	@Title VARCHAR(100) null,
	@SubjectId INT,
	@CorrectionDate DATE,
	@Date DATE,
	@ReportId int
AS
	INSERT INTO Test(TestType, Title, SubjectId, CorrectionDate, Date, ReportId) VALUES
	(@TestType, @Title, @SubjectId, @CorrectionDate, @Date, @ReportId);
	SELECT SCOPE_IDENTITY() as TestId;
RETURN 0
