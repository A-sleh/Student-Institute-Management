CREATE PROCEDURE [dbo].[ReportLinkWithTests]
	@testId int,
	@reportId int
AS
	UPDATE Test SET
	ReportId = @reportId
	WHERE Id = @testId
RETURN 0
