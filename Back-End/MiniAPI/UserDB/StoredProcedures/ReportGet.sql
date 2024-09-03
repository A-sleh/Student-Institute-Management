CREATE PROCEDURE [dbo].[ReportGet]
	@Id int
AS
BEGIN
	SELECT id as ReportId, ReportTitle, StartDate, FinishDate
	FROM report 
	WHERE Id = @Id;
END