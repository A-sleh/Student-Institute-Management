CREATE PROCEDURE [dbo].[ReportGet]
	@Id int
AS
BEGIN
	SELECT * FROM Report
	WHERE Id = @Id;
END