CREATE PROCEDURE [dbo].[GradeGetCount]
	@students BIT,
	@subjects BIT,
	@classes BIT
AS
	IF(@students = 1 AND @subjects = 0 AND @classes = 0) -- get student number for each grade
	BEGIN
		SELECT g.gradeId, g.grade, (SELECT COUNT(*)
		FROM Student
		WHERE id IN (
		SELECT s.id 
		FROM Student s 
		JOIN Class c ON s.classId = c.id 
		WHERE c.gradeId = g.gradeId)) as count
		FROM Grade g
	END
	ELSE IF(@subjects = 1 AND @students = 0 AND @classes = 0)
	BEGIN
		SELECT g.gradeId, g.grade, 
		(SELECT COUNT(*)
		FROM Subject
		WHERE gradeId = g.gradeId
		) as count
		FROM Grade g
	END
	ELSE IF(@classes = 1 AND @students = 0 AND @subjects = 0)
	BEGIN
		SELECT g.gradeId, g.grade, 
		(SELECT COUNT(*)
		FROM Class
		WHERE gradeId = g.gradeId
		) as count
		FROM Grade g
	END
	ELSE
		THROW 55000, 'invalid parameters', 1;
RETURN 0
