CREATE PROCEDURE [dbo].[StudentRecordedAbsence]
	@classId INT,
	@date Date
AS
	SELECT s.id AS studentId FROM Student s 
	JOIN Class c ON s.classId = c.id AND c.id = @classId
	JOIN absence a ON s.id = a.studentId AND a.date = @date
RETURN 0
