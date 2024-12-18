CREATE PROCEDURE [dbo].[ClassUpdate]
	@ClassId int,
	@Title NVARCHAR(50),
	@Capacity INT,
	@Gender NVARCHAR(10),
	@GradeId int
AS
	UPDATE Class
	SET title = @Title, capacity = @Capacity, gender = @Gender, gradeId = @GradeId
	WHERE id = @ClassId;
RETURN 0
