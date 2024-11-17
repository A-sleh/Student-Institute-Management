CREATE PROCEDURE [dbo].[SubjectGet]
	@Id int
AS
BEGIN
	SELECT Id as SubjectId, Subject, MaximumMark, g.gradeId, g.grade
	FROM Subject s
	LEFT OUTER JOIN Grade g ON s.gradeId = g.gradeId
	WHERE Id = @Id;
END
