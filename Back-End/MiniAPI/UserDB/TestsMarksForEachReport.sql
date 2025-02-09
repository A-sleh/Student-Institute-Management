CREATE VIEW [dbo].[TestsMarksForEachReport]
	AS (
	SELECT sub.Id as SubjectId, r.Id, r.ReportTitle, r.StartDate, r.FinishDate, t.TestType, tm.StudentId, SUM(tm.Mark)/COUNT(*) as mark, SUM(MaximumMark)/COUNT(*) as totalMark
	FROM TestMark tm
	JOIN Test t ON tm.TestId = t.Id
	JOIN Subject sub ON t.SubjectId = sub.Id
	JOIN Report r ON t.ReportId = r.Id
	GROUP BY sub.Id, MaximumMark, r.Id, r.ReportTitle, r.StartDate, r.FinishDate, t.TestType, tm.StudentId
)
