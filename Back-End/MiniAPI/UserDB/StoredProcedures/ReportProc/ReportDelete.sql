CREATE PROCEDURE [dbo].[ReportDelete]
	@Id int
AS
	DELETE FROM Report
	WHERE Id = @Id;
RETURN 0
