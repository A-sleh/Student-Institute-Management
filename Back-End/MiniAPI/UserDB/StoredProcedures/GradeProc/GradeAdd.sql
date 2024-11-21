CREATE PROCEDURE [dbo].[GradeAdd]
	@gradeId INT NULL,
	@grade VARCHAR(256)
AS
	INSERT INTO Grade(grade) VALUES (@grade);
RETURN 0
