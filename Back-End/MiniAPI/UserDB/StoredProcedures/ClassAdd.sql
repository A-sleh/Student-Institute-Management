CREATE PROCEDURE [dbo].[ClassAdd]
	@ClassId int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@Grade VARCHAR(10)
AS
	INSERT INTO class(title, capacity, gender, grade)
	VALUES (@Title, @Capacity, @Gender, @Grade);
RETURN 0
