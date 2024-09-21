CREATE PROCEDURE [dbo].[BillGetTotalByClass]
@classId INT
AS
BEGIN
	SELECT SUM(s.billRequired) as Total, SUM(b.Amount) as Paid
	FROM Student s
	LEFT OUTER JOIN Bill b ON s.id = b.StudentId
	WHERE s.classId = @classId;
END