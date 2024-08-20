CREATE PROCEDURE [dbo].[ReportGetAll]
AS
BEGIN
	SELECT id as ReportId, ReportTitle, StartDate, FinishDate
	FROM Report
END