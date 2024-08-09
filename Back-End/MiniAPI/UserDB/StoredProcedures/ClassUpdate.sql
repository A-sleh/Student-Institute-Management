CREATE PROCEDURE [dbo].[ClassUpdate]
	@Id int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@Grade VARCHAR(10)
AS
	UPDATE Class
	SET title = @Title, capacity = @Capacity, gender = @Gender, grade = @Grade
	WHERE id = @Id;
RETURN 0
