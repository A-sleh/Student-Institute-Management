CREATE PROCEDURE [dbo].[ReportGetStudentReportsResults]
	@studentId int
AS
	SELECT rm.Id, rm.ReportTitle, rm.StartDate, rm.FinishDate, rm.TestType,
	SUM(rm.mark) as mark,
	SUM(rm.totalMark) as totalMark,
	LEFT(SUM(rm.mark)*100.0/SUM(rm.totalMark), 5) as markPercentage
	FROM TestsMarksForEachReport rm
	WHERE rm.StudentId = @studentId
	GROUP BY rm.Id, rm.ReportTitle, rm.StartDate, rm.FinishDate, rm.TestType
RETURN 0
