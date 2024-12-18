CREATE PROCEDURE [dbo].[ClassAdd]
	@ClassId int,
	@Title NVARCHAR(50),
	@Capacity INT,
	@Gender NVARCHAR(10),
	@GradeId int
AS
	INSERT INTO Class(title, capacity, gender, gradeId)
	VALUES (@Title, @Capacity, @Gender, @GradeId);
RETURN 0
