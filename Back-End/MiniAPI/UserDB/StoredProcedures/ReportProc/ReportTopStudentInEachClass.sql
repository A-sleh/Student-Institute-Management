CREATE PROCEDURE [dbo].[ReportTopStudentInEachClass]
	@reportId int
AS
	WITH top_students AS (
	SELECT s.id as studentId, s.name, s.lastName , ROUND((SUM(tm.mark + 0.0)*100) / SUM(sb.MaximumMark), 2, 4) as Average,
	RANK() OVER (PARTITION BY s.classId ORDER BY (SUM(tm.mark + 0.0) / SUM(sb.MaximumMark)) DESC)  AS mark_rank
	FROM Student s JOIN TestMark tm ON s.id = tm.StudentId
	JOIN Test t ON tm.TestId = t.Id
	JOIN Subject sb ON t.SubjectId = sb.Id
	JOIN Report r ON t.ReportId = r.Id
	WHERE t.TestType = 'exam' AND r.Id = 1
	GROUP BY s.id,s.name, s.lastName, s.classId)

	SELECT * FROM top_students WHERE mark_rank = 1
RETURN 0
