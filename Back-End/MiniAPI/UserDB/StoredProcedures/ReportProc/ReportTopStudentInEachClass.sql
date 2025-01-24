CREATE PROCEDURE [dbo].[ReportTopStudentInEachClass]
	@reportId int
AS
	WITH top_students AS (
	SELECT s.id as studentId, s.name, s.lastName, c.id as classId, c.title, ROUND((SUM(tm.mark)*100.0) / SUM(sb.MaximumMark), 2) as Average,
	DENSE_RANK() OVER (PARTITION BY s.classId ORDER BY ROUND((SUM(tm.mark)*100.0) / SUM(sb.MaximumMark), 2) DESC, s.name DESC)  AS mark_rank
	FROM Student s 
	JOIN TestMark tm ON s.id = tm.StudentId
	JOIN Test t ON tm.TestId = t.Id
	JOIN Subject sb ON t.SubjectId = sb.Id
	JOIN Report r ON t.ReportId = r.Id
	JOIN Class c ON s.classId = c.id
	WHERE t.TestType = 'exam' AND r.Id = 1
	GROUP BY s.id,s.name, s.lastName, s.classId, c.id, c.title)

	SELECT studentId, name, lastName, classId, title, Average 
	FROM top_students 
	WHERE mark_rank = 1;
RETURN 0
