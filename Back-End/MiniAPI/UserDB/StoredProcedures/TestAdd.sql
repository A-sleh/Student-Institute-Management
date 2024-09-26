CREATE PROCEDURE [dbo].[TestAdd]
	@TestType VARCHAR(20),
	@SubjectId INT,
	@CorrectionDate DATE,
	@Date DATE,
	@ReportId int
AS
	INSERT INTO Test(TestType, SubjectId, CorrectionDate, Date, ReportId) VALUES
	(@TestType, @SubjectId, @CorrectionDate, @Date, @ReportId);
RETURN 0
