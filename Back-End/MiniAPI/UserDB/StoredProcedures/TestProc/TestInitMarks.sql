CREATE PROCEDURE [dbo].[TestInitMarks]
	@TestId int,
	@ClassId int
AS
	DECLARE @CurrId int
	DECLARE Students CURSOR 
	  LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR 
	SELECT id
	FROM Student
	WHERE classId = @ClassId

	OPEN Students
	FETCH NEXT FROM Students INTO @CurrId
	WHILE @@FETCH_STATUS = 0	
	BEGIN 
		INSERT INTO TestMark(TestId, StudentId, Mark)
		VALUES (@TestId, @CurrId, null);
		FETCH NEXT FROM Students INTO @CurrId
	END
	CLOSE Students
	DEALLOCATE Students
RETURN 0;
