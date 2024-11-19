CREATE PROCEDURE [dbo].[ClassAdd]
	@ClassId int,
	@Title VARCHAR(50),
	@Capacity INT,
	@Gender VARCHAR(10),
	@GradeId int
AS
	INSERT INTO Class(title, capacity, gender, gradeId)
	VALUES (@Title, @Capacity, @Gender, @GradeId);
RETURN 0
