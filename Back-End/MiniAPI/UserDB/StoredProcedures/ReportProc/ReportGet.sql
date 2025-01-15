CREATE PROCEDURE [dbo].[ReportGet]
	@Id int,
	@classId int null
AS
BEGIN
	SELECT DISTINCT
	r.Id as ReportId, ReportTitle, StartDate, FinishDate,
	t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
	s.Id as SubjectId, s.Subject, g.gradeId, g.grade, s.MaximumMark
	FROM Report r
	LEFT OUTER JOIN Test t ON r.Id = t.ReportId
	LEFT OUTER JOIN Subject s ON t.SubjectId = s.Id
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	LEFT OUTER JOIN TestMark ts ON t.Id = ts.TestId
	LEFT OUTER JOIN Student st ON ts.StudentId = st.id
	WHERE r.Id = @Id AND (@classId IS NULL OR st.classId = @classId);
END