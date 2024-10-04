CREATE PROCEDURE [dbo].[TestGetStudentRptAvg]
	@StudentId int,
	@ReportId int
AS
	SELECT (SUM( ts.Mark ) * 100) / SUM( s.MaximumMark ) as Average
	FROM TestMark ts
	JOIN Test t ON ts.TestId = t.Id
	JOIN Subject s ON t.SubjectId = s.Id
	WHERE ts.StudentId = @StudentId 
	AND t.ReportId = @ReportId
	AND ts.Mark is not null
RETURN 0
