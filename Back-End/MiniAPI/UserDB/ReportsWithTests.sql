CREATE VIEW [dbo].[ReportsWithTests]
	AS SELECT r.Id as ReportId, ReportTitle, StartDate, FinishDate,
		t.Id as TestId, t.Title, t.TestType, t.Date, t.CorrectionDate,
		sbj.Id as SubjectId, sbj.Subject,g.gradeId, g.grade, sbj.MaximumMark
		FROM Report r 
		LEFT OUTER JOIN Test t ON r.Id = t.ReportId
		LEFT OUTER JOIN Subject sbj ON t.SubjectId = sbj.Id
		LEFT OUTER JOIN Grade g ON sbj.gradeId = g.gradeId
