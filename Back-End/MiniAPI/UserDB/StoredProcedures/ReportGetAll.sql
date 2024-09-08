CREATE PROCEDURE [dbo].[ReportGetAll]
AS
BEGIN
	SELECT Id as ReportId, ReportTitle, StartDate, FinishDate
	FROM Report
END