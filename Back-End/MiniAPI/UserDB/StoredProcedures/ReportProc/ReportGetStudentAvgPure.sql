CREATE PROCEDURE [dbo].[ReportGetStudentAvgPure]
	@reportId int,
	@classId int
AS
-- NOT USED ANYMORE
	--WITH bachelorM(studentId, reportId, gradeId, subject, Mark) as 
	--(
	--	SELECT sst.id, tt.ReportId, ss.gradeId, ss.Subject, ttm.Mark
	--	FROM TestMark ttm 
	--	JOIN Student sst ON ttm.StudentId = sst.id
	--	JOIN Test tt ON ttm.TestId = tt.Id
	--	JOIN Subject ss ON tt.SubjectId = ss.Id
	--	WHERE ss.Subject in ('france', 'english') 
	--)
	--SELECT st.id as StudentId,
	--SUM(tm.Mark) + COALESCE(
	--(
	--	SELECT MAX(Mark)
	--	FROM bachelorM bm
	--	WHERE bm.studentId = st.id 
	--	AND bm.reportId = @reportId
	--	AND bm.gradeId = 1
	--), 0)
	--as PureMark
	--FROM Student st 
	--JOIN TestMark tm ON st.id = tm.StudentId
	--JOIN Test t ON tm.TestId = t.Id
	--JOIN Subject s ON t.SubjectId = s.Id
	--JOIN Report r ON t.ReportId = r.Id
	--WHERE r.Id = @reportId 
	--AND st.classId = @classId
	--AND t.TestType <> 'quiz'
	--AND (s.gradeId <> 1 OR s.Subject not in ('religion', 'english', 'france'))
	--GROUP BY st.id, t.TestType
RETURN 0
