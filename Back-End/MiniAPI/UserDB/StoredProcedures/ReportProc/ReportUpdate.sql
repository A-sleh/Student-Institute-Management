CREATE PROCEDURE [dbo].[ReportUpdate]
	@ReportId int,
	@ReportTitle VARCHAR(100),
	@StartDate Date,
	@FinishDate Date
AS
	UPDATE Report 
	SET ReportTitle = @ReportTitle,
		StartDate = @StartDate,
		FinishDate = @FinishDate
	WHERE Id = @ReportId;
RETURN 0
