CREATE PROCEDURE [dbo].[StudentAbsenceDelete]
	@absenceId INT
AS
	DELETE FROM absence WHERE absenceId = @absenceId
RETURN 0
