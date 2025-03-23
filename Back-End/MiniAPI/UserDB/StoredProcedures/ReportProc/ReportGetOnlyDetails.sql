CREATE PROCEDURE [dbo].[ReportGetOnlyDetails]
	@reportId int
AS
	SELECT
	r.Id as ReportId, ReportTitle, StartDate, FinishDate
	FROM Report r 
	WHERE r.Id = @reportId
RETURN 0
