CREATE PROCEDURE [dbo].[ReportGetStudentTotalResult]
	@reportId int,
	@studentId int
AS
	SELECT SUM(tmr.mark) as mark,
	SUM(tmr.totalMark) as totalMark,
	CAST(LEFT(SUM(tmr.mark)*100.0/SUM(tmr.totalMark), 5) as float) as markPercentage
	FROM TestsMarksForEachReport tmr
	WHERE tmr.Id = @reportId
	AND tmr.StudentId = @studentId
	AND tmr.TestType = 'exam'
RETURN 0
