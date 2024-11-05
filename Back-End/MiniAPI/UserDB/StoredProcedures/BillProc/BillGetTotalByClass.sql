CREATE PROCEDURE [dbo].[BillGetTotalByClass]
@classId INT
AS
BEGIN
	SELECT (SELECT SUM(s.billRequired) FROM Student s WHERE s.classId = @classId) as Total, SUM(b.Amount) as Paid
	FROM Student s INNER JOIN Bill b ON s.id = b.StudentId
	WHERE s.classId = @classId
END