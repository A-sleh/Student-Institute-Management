CREATE PROCEDURE [dbo].[TestGet]
@ReportId int
AS
BEGIN
	SELECT r.ReportTitle as Report,
		s.Subject as Subject,
		s.MaximumMark as MaxMark,
		t.TestType as Type,
		t.Date as Date
	FROM Test t left outer join Report r on t.ReportId = r.Id 
	left outer join Subject s on t.SubjectId = s.Id
	WHERE r.Id = @ReportId
	order by r.Id ASC;
END
