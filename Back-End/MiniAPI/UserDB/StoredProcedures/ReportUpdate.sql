CREATE PROCEDURE [dbo].[ReportUpdate]
	@Id int,
	@ReportTitle VARCHAR(100),
	@StartDate Date,
	@FinishDate Date
AS
	UPDATE Report 
	SET ReportTitle = @ReportTitle,
		StartDate = @StartDate,
		FinishDate = @FinishDate
	WHERE Id = @Id;
RETURN 0
