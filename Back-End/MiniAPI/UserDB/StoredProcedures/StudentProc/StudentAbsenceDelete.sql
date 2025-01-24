CREATE PROCEDURE [dbo].[StudentAbsenceDelete]
	@absenceId INT
AS
	SELECT TOP(1) studentId FROM absence WHERE absenceId = @absenceId;
	DELETE FROM absence WHERE absenceId = @absenceId;
RETURN 0
