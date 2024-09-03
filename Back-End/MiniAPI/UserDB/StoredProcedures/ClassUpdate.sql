CREATE PROCEDURE [dbo].[ClassUpdate]
	@ClassId int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@Grade VARCHAR(10)
AS
	UPDATE class
	SET title = @Title, capacity = @Capacity, gender = @Gender, grade = @Grade
	WHERE id = @ClassId;
RETURN 0
