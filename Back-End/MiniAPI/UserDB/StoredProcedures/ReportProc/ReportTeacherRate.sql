CREATE PROCEDURE [dbo].[ReportTeacherRate]
	@subjectId int
AS
	SELECT t.Id, t.Name, t.LastName, Left(SUM(tm.Mark)*100.0/(SUM(s.MaximumMark)*20), 4) as rate
	FROM TestMark tm 
	JOIN Student st ON tm.StudentId = st.id
	JOIN Class c ON st.classId = c.id
	JOIN SubTeachClass stc ON stc.ClassId = c.id
	JOIN TeacherSubject ts ON stc.TeachSubId = ts.Id
	JOIN Teacher t ON ts.TeacherId = t.Id
	JOIN Subject s ON ts.SubjectId = s.Id
	WHERE ts.SubjectId = @subjectId
	AND tm.TestId in (SELECT t.Id FROM Test t WHERE t.SubjectId = @subjectId)
	GROUP BY t.Id, t.Name, t.LastName
	ORDER BY rate DESC
RETURN 0
