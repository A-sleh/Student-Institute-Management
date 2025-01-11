CREATE PROCEDURE [dbo].[StudentAbsenceGet]
	@studentId INT
AS
	SELECT a.absenceId, a.date
	FROM Student s JOIN absence a ON s.id = a.studentId
	WHERE s.id = @studentId
RETURN 0
