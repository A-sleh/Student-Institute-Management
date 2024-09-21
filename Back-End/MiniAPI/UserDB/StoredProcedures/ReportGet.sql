CREATE PROCEDURE [dbo].[ReportGet]
	@Id int
AS
BEGIN
	SELECT Id as ReportId, ReportTitle, StartDate, FinishDate
	FROM Report 
	WHERE Id = @Id;
END