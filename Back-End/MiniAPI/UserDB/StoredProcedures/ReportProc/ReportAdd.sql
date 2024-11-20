﻿CREATE PROCEDURE [dbo].[ReportAdd]
	@ReportTitle VARCHAR(100),
	@StartDate DATE,
	@FinishDate DATE
AS
	INSERT INTO Report(ReportTitle, StartDate, FinishDate)
	VALUES(@ReportTitle, @StartDate, @FinishDate);
RETURN 0