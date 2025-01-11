CREATE PROCEDURE [dbo].[StudentAbsenceAdd]
	@studentId INT,
	@date date NULL
AS
	if(@date is null)
		set @date = GETDATE()
	INSERT INTO absence(studentId, date) VALUES (@studentId, @date);
RETURN 0
