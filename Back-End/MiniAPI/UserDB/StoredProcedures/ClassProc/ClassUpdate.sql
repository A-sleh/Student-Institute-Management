CREATE PROCEDURE [dbo].[ClassUpdate]
	@ClassId int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@GradeId int
AS
	UPDATE Class
	SET title = @Title, capacity = @Capacity, gender = @Gender, gradeId = @GradeId
	WHERE id = @ClassId;
RETURN 0
