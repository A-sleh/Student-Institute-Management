CREATE PROCEDURE [dbo].[GradeGetCount]
	@gradeId INT NULL
AS
	WITH teachers AS (
		SELECT s.gradeId ,COUNT(*) as TeachersNO
		FROM Teacher t 
		JOIN TeacherSubject ts ON t.Id = ts.TeacherId 
		JOIN Subject s ON ts.SubjectId = s.Id 
		GROUP BY gradeId
	),
	students AS (
		SELECT c.gradeId, COUNT(*) as StudentsNO
		FROM Student s 
		JOIN Class c ON s.classId = c.id 
		GROUP BY gradeId
	),
	classes AS (
		SELECT gradeId, COUNT(*) AS ClassesNO
		FROM Class 
		GROUP BY gradeId
	)

	SELECT g.gradeId, g.grade, t.TeachersNO, s.StudentsNO, c.ClassesNO 
	FROM Grade g
	LEFT OUTER JOIN teachers t ON g.gradeId = t.gradeId 
	LEFT OUTER JOIN students s ON g.gradeId = s.gradeId
	LEFT OUTER JOIN classes c ON g.gradeId = c.gradeId
	WHERE @gradeId IS NULL OR
	g.gradeId = @gradeId
RETURN 0
